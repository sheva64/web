const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// а. Файли проекту завантажуються з серверної частини
app.use(express.static('public'));

// Масив користувачів
const users = [];
for (let i = 1; i <= 20; i++) {
    users.push({
        firstname: `Name${i}`,
        lastname: `Surname${i}`,
        score: Math.floor(Math.random() * 100) + 1
    });
}

// b. Список користувачів повертається сервером, c. Сортування через queryParameter
app.get('/api/users', (req, res) => {
    let resultUsers = [...users];

    const sortBy = req.query.sortBy; 
    const order = req.query.order;
    if (sortBy) {
        resultUsers.sort((a, b) => {
            const valA = a[sortBy].toLowerCase();
            const valB = b[sortBy].toLowerCase();
            
            if (valA < valB) return order === 'desc' ? 1 : -1;
            if (valA > valB) return order === 'desc' ? -1 : 1;
            return 0;
        });
    } else {
        // Якщо сортування не задано, просто перемішуємо
        resultUsers.sort(() => 0.5 - Math.random());
    }

    // Повертаємо 10 користувачів
    res.json(resultUsers.slice(0, 10));
});

// b. Метод для отримання нових користувачів
app.get('/api/newUsers', (req, res) => {
    res.json(users.slice(0, 5));
});

// d. API для отримання списку картинок з папки gallery
app.get('/api/gallery', (req, res) => {
    const galleryPath = path.join(__dirname, 'public', 'gallery');
    fs.readdir(galleryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read gallery directory' });
        }
        // Відфільтровуємо лише зображення
        const images = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));
        res.json(images);
    });
});

// 3. Обробник маршруту /weather
app.get('/weather', (req, res) => {
    const randomTemp = Math.floor(Math.random() * 31);
    res.json({ city: 'Kyiv', temperature: randomTemp });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});