const persons = [
    { name: 'John', age: 23, city: 'Boston' },
    { name: 'Bohdan', age: 20, city: 'Kyiv' },
    { name: 'Max', age: 19, city: 'Bern' },
    { name: 'Denis', age: 21, city: 'London' },
    { name: 'Roman', age: 22, city: 'Berlin' }
];

// Функція для пошуку користувача за іменем
function getUserData(userName) {
    const user = persons.find(person => person.name === userName);
    
    if (!user) {
        throw new Error('Unable to find user');
    }
    
    return user;
}

// Функція для відображення інформації про користувача
function showUserInfo(name) {
    console.log('Loading');
    
    try {
        const user = getUserData(name);
        // Виводимо всі поля об'єкта
        console.log(`User found: Name: ${user.name}, Age: ${user.age}, City: ${user.city}`);
    } catch (error) {
        // Виводимо повідомлення про помилку
        console.error(`Error: ${error.message}`);
    } finally {
        // Цей блок виконається в будь-якому випадку
        console.log('Loading finished');
    }
}

console.log("--- Спроба знайти існуючого користувача ---");
showUserInfo('Bohdan');

console.log("\n--- Спроба знайти неіснуючого користувача ---");
showUserInfo('Oleg');