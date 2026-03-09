// Створюємо масив з 20 об'єктів користувачів
const users = [];
for (let i = 1; i <= 20; i++) {
    users.push({
        firstname: `Name${i}`,
        lastname: `Surname${i}`,
        score: Math.floor(Math.random() * 100) + 1 // Випадковий бал від 1 до 100
    });
}

// Функція fetchUsers: повертає 10 випадкових користувачів із затримкою 1 секунда
function fetchUsers() {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Робимо копію масиву, перемішуємо його та беремо перші 10 елементів
            const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
            const randomTenUsers = shuffledUsers.slice(0, 10);
            resolve(randomTenUsers);
        }, 1000); // Затримка 1 секунда
    });
}

// Функція getNewUsers: повертає 5 перших елементів масиву
function getNewUsers() {
    console.log(users.slice(0, 5));
    return users.slice(0, 5);
}