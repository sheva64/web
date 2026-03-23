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
            const isServerDown = Math.random() < 0.01;
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
 * TASK 2: Implement loadScripts
 */
async function loadScripts(ids) {
    const resultsMap = new Map();

    async function fetchTree(id, path = new Set()) {
        // Захист від нескінченних циклів
        if (path.has(id)) {
            throw new Error(`Circular dependency detected: ${[...path, id].join(' -> ')}`);
        }
        // Якщо скрипт вже завантажений або в процесі - пропускаємо
        if (resultsMap.has(id)) return;

        // Бронюємо місце
        resultsMap.set(id, null);

        const script = await getSafeScriptInfo(id);

        // Записуємо фактичні дані {id, content}
        resultsMap.set(id, { id: script.id, content: script.content });

        if (script.deps && script.deps.length > 0) {
            // Додаємо поточний id до шляху для дітей
            const currentPath = new Set(path).add(id);
            await Promise.all(script.deps.map(dep => fetchTree(dep, currentPath)));
        }
    }

    // Запускаємо всі стартові точки паралельно. 
    // Якщо хоч один Promise впаде з помилкою, весь Promise.all автоматично зробить reject.
    await Promise.all(ids.map(id => fetchTree(id)));

    // Повертаємо плоский масив значень
    return Array.from(resultsMap.values());
}

/**
 * TEST RUNNER
 */
async function runTask2() {
    try {
        console.log("Starting loadScripts for ['auth-mod', 'ui-lib']...");
        const START_TIME = Date.now();

        const scripts = await loadScripts(['auth-mod', 'ui-lib']);

        const duration = ((Date.now() - START_TIME) / 1000).toFixed(2);

        console.log("\n--- TASK 2 RESULTS ---");
        console.log(scripts);
        console.log(`Total unique scripts: ${scripts.length}`);
        console.log(`Duration: ${duration}s`);
    } catch (e) {
        // Демонстрація атомарності - при помилці ми потрапляємо сюди
        console.error(`\nTEST CRASHED ATOMICALLY: ${e.message}`);
    }
}

runTask2();