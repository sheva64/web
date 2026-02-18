const persons = [
    { name: 'John', age: 23, city: 'Boston' },
    { name: 'Bohdan', age: 20, city: 'Kyiv' },
    { name: 'Max', age: 19, city: 'Bern' },
    { name: 'Denis', age: 21, city: 'London' },
    { name: 'Roman', age: 22, city: 'Berlin' }
];

// Проходимо по кожному об'єкту в масиві та додаємо геттер
persons.forEach(person => {
    Object.defineProperty(person, 'birthYear', {
        // Геттер обчислює значення на основі поточного року та віку
        get: function() {
            const currentYear = new Date().getFullYear();
            return currentYear - this.age;
        },
        // Робимо властивість видимою при ітерації
        enumerable: true,
        // Оскільки ми не визначаємо 'set', властивість стає доступною тільки для читання (read-only)
        configurable: false 
    });
});

persons.groupName = 'A';
persons.teacher = 'Joan Doe';
persons.year = '2023';

console.log("--- Вивід за допомогою класичного циклу for (індекси) ---");
for (let i = 0; i < persons.length; i++) {
    console.log(persons[i]);
}

console.log("\n--- Вивід за допомогою циклу for...of (значення елементів) ---");
for (const person of persons) {
    console.log(person);
}

console.log("\n--- Вивід за допомогою циклу for...in (ключі та властивості) ---");
// Цей цикл перебирає всі ключі, включаючи індекси масиву та додані нами властивості
for (const key in persons) {
    console.log(`${key}:`, persons[key]);
}

const textFragments = persons.map(person => {
    return `${person.name} from ${person.city} born in ${person.birthYear}`;
});

console.log(textFragments);


const adults = persons.filter(person => person.age > 20);

console.log("People older than 20:");
console.log(adults);

// Деструктуризація масиву. Отримуємо перший елемент (індекс 0)
const [firstUser] = persons;

// Деструктуризація об'єкта. Беремо дані з щойно створеної змінної firstUser
const { name, city } = firstUser;

console.log(`Перша людина у списку: ${name}, проживає у місті: ${city}`);