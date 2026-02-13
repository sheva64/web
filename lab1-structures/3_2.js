const defaults = { mode: 'test', debugLevel: 'error', logFolder: 'root' };
const userSetting = { mode: 'production', debugLevel: 'trace' };


// 1. Spread-оператор 
// Об'єкти "розгортаються" всередині нового об'єкта. 
// Те, що стоїть праворуч, переписує те, що зліва.
function mergeSettingsSpread(def, user) {
    return { ...def, ...user };
}

const result1 = mergeSettingsSpread(defaults, userSetting);
console.log(result1);

// 2. Метод Object.assign() 
// Цей метод копіює властивості з одного або кількох джерел у цільовий об'єкт.
// Першим аргументом ми передаємо порожній об'єкт {}, щоб не змінити оригінальний defaults.
function mergeSettingsAssign(def, user) {
    return Object.assign({}, def, user);
}

const result2 = mergeSettingsAssign(defaults, userSetting);
console.log(result2);

// 3. Ручний перебір через цикл for...in
function mergeSettingsManual(def, user) {
    let result = {};
    
    // Спочатку копіюємо всі дефолтні налаштування
    for (let key in def) {
        result[key] = def[key];
    }
    
    // Потім замінюємо їх значеннями користувача
    for (let key in user) {
        result[key] = user[key];
    }
    
    return result;
}

const result3 = mergeSettingsManual(defaults, userSetting);
console.log(result3);