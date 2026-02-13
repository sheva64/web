// Початкові масиви для демонстрації
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

console.log("--- 1. Метод concat() ---");
// Створює новий масив, оригінали не змінюються
const combinedConcat = arr1.concat(arr2);
console.log("Результат:", combinedConcat);
console.log("arr1 не змінився:", arr1);


console.log("\n--- 2. Spread-оператор (...) ---");
// Найсучасніший спосіб, створює новий масив
const combinedSpread = [...arr1, ...arr2];
console.log("Результат:", combinedSpread);


console.log("\n--- 3. Метод push() з розпаковкою (Мутація) ---");
// Цей спосіб змінює перший масив, додаючи в нього елементи другого
const targetArray = ['a', 'b'];
const sourceArray = ['c', 'd'];

targetArray.push(...sourceArray);
console.log("Результат (targetArray змінено):", targetArray);


console.log("\n--- 4. Array.prototype.push.apply() (Старий стиль) ---");
// Робить те саме, що і пункт 3, але через старий синтаксис
const listA = [10, 20];
const listB = [30, 40];

Array.prototype.push.apply(listA, listB);
console.log("Результат (listA змінено):", listA);