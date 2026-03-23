/**
 * REPOSITORY SIMULATOR
 */
const Repository = (function () {
    const _db = {
        'app-root': { id: 'app-root', size: 100, content: '111', deps: ['auth-mod', 'ui-lib'] },
        'auth-mod': { id: 'auth-mod', size: 50, content: '222', deps: ['crypto-utils'] },
        'ui-lib': { id: 'ui-lib', size: 200, content: '333', deps: ['icon-set', 'canvas-api'] },
        'crypto-utils': { id: 'crypto-utils', size: 30, content: '444', deps: ['wasm-core'] },
        'canvas-api': { id: 'canvas-api', size: 80, content: '555', deps: ['wasm-core'] },
        'icon-set': { id: 'icon-set', size: 20, content: '666', deps: [] },
        'wasm-core': { id: 'wasm-core', size: 500, content: '777', deps: [] },
    };

    return {
        getScriptInfo: (id) => new Promise((resolve, reject) => {
            console.log(`API Request: ${id}`);
            const isServerDown = Math.random() < 0.5;
            setTimeout(() => {
                if (isServerDown) return reject(new Error('Server is unavailable'));
                _db[id] ? resolve(_db[id]) : reject(new Error(`Script ${id} not found.`));
            }, 1000 + Math.random() * 3000);
        })
    };
})();

/**
 * SENIOR INFRASTRUCTURE
 */

// 1. Concurrency Limiter (Семафор) - запобігає 429 Too Many Requests
class Semaphore {
    constructor(max) {
        this.max = max;
        this.active = 0;
        this.queue = [];
    }
    async acquire() {
        if (this.active >= this.max) {
            await new Promise(resolve => this.queue.push(resolve));
        }
        this.active++;
    }
    release() {
        this.active--;
        if (this.queue.length > 0) this.queue.shift()();
    }
}

const apiSemaphore = new Semaphore(3); // Максимум 3 паралельні запити
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// 2. Exponential Backoff - розумні повторні спроби
async function fetchWithRetry(id, retries = 3, baseDelay = 200) {
    for (let i = 0; i < retries; i++) {
        try {
            await apiSemaphore.acquire();
            const result = await Repository.getScriptInfo(id);
            apiSemaphore.release();
            return result;
        } catch (error) {
            apiSemaphore.release();
            if (i === retries - 1) throw error; // Остання спроба

            console.warn(`Server down for ${id}. Retrying in ${baseDelay * Math.pow(2, i)}ms...`);
            await delay(baseDelay * Math.pow(2, i));
        }
    }
}

// 3. Promise Memoization
const globalPromiseCache = new Map();

function getSafeScriptInfo(id) {
    // Якщо запит вже виконується, повертаємо його Promise (захист від Race Conditions)
    if (globalPromiseCache.has(id)) {
        return globalPromiseCache.get(id);
    }

    const fetchPromise = (async () => {
        try {
            return await fetchWithRetry(id);
        } catch (err) {
            // Cache Invalidation: очищаємо кеш при фатальній помилці
            globalPromiseCache.delete(id);
            throw err;
        }
    })();

    globalPromiseCache.set(id, fetchPromise);
    return fetchPromise;
}

/**
 * TASK 1: Implement getBuildSize
 */
async function getBuildSize(startId) {
    const counted = new Set();
    let totalSize = 0;

    async function walk(id, path = new Set()) {
        // Захист від нескінченних циклів
        if (path.has(id)) {
            throw new Error(`Circular dependency detected: ${[...path, id].join(' -> ')}`);
        }
        
        if (counted.has(id)) return;
        counted.add(id);

        const script = await getSafeScriptInfo(id);

        totalSize += script.size;

        if (script.deps && script.deps.length > 0) {
            // Додаємо поточний id до шляху для дітей
            const currentPath = new Set(path).add(id);
            // Паралельне завантаження залежностей
            await Promise.all(script.deps.map(dep => walk(dep, currentPath)));
        }
    }

    await walk(startId);
    return totalSize;
}

/**
 * TEST RUNNER
 */
async function runTest() {
    const EXPECTED_SIZE = 980;
    const START_TIME = Date.now();

    console.log("Starting calculation for 'app-root'...");

    try {
        const result = await getBuildSize('app-root');
        const duration = ((Date.now() - START_TIME) / 1000).toFixed(2);

        console.log("\n--- TEST RESULTS ---");
        console.log(`Result: ${result}kb`);
        console.log(`Duration: ${duration}s`);

        if (result === EXPECTED_SIZE) {
            console.log("PASS");
        } else if (result === 1480) {
            console.log("SEMI-PASS");
        } else {
            console.log(`FAIL: Expected ${EXPECTED_SIZE}kb but got ${result}kb.`);
        }

    } catch (e) {
        console.error(`\nTEST CRASHED: ${e.message}`);
    }
}

runTest();