function init() {
    // Знаходимо головний контейнер
    const rootMain = document.getElementById('main');

    let sumDisplay; // Змінна для зберігання елемента з сумою

    // Створюємо header, main, footer та додаємо їх
    const header = document.createElement('header');
    const mainContent = document.createElement('main');
    const footer = document.createElement('footer');
    rootMain.append(header, mainContent, footer);

    // Створюємо 3 панелі всередині main
    const leftPanel = document.createElement('div');
    leftPanel.id = 'leftPanel';
    const content = document.createElement('div');
    content.id = 'content';
    const rightPanel = document.createElement('div');
    rightPanel.id = 'rightPanel';
    mainContent.append(leftPanel, content, rightPanel);

    // Допоміжна функція для створення лоадера
    const createLoader = () => {
        const loader = document.createElement('div');
        loader.className = 'loader';
        return loader;
    };

    // Додаємо лоадери у всі три панелі
    leftPanel.appendChild(createLoader());
    content.appendChild(createLoader());
    rightPanel.appendChild(createLoader());

    // --- Робота з Header ---
    const buttons = ['User Rating', 'News', 'Contacts', 'About'];
    const contentHeading = document.createElement('h2'); // Елемент для заголовка в content

    buttons.forEach(btnText => {
        const btn = document.createElement('button');
        btn.textContent = btnText;
        
        // Обробник кліку для відображення імені кнопки як заголовка
        btn.addEventListener('click', () => {
            contentHeading.textContent = btnText;
            if (!content.contains(contentHeading)) {
                content.prepend(contentHeading); 
            }
        });
        
        header.appendChild(btn);
    });

    // --- Робота з Footer ---
    const currentUsers = document.createElement('div');
    currentUsers.textContent = `Current users: ${users.length}`;
    
    const newUsers = document.createElement('div');
    const lastFiveUsers = getNewUsers();

    const names = lastFiveUsers.map(user => user.firstname).join(', ');
    newUsers.textContent = `New users: ${names}`;
    
    footer.append(currentUsers, newUsers);

    // --- Робота з Content (Таймер на 1 секунду) ---
    setTimeout(() => {
        const loaderInContent = content.querySelector('.loader');
        if (loaderInContent) {
            loaderInContent.remove();
        }

        const noUsersText = document.createElement('span');
        noUsersText.textContent = 'No users ';
        
        const getUsersBtn = document.createElement('button');
        getUsersBtn.textContent = 'Get Users';
        getUsersBtn.id = 'getUsersBtn';

        content.append(noUsersText, getUsersBtn);

        // Робимо функцію асинхронною (async), щоб використати await для Promise
        getUsersBtn.addEventListener('click', async () => {
            // Вимикаємо кнопку, щоб не натиснули двічі під час завантаження
            getUsersBtn.disabled = true;
            
            // Викликаємо функцію з api.js та чекаємо 1 секунду на результат
            const usersData = await fetchUsers();
            
            // Приховуємо текст "No users" та кнопку
            noUsersText.style.display = 'none';
            getUsersBtn.style.display = 'none';

            // Створюємо таблицю
            // Створюємо таблицю
            const table = document.createElement('table');
            table.id = 'usersTable';
            
            // Створюємо заголовок таблиці
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            // Змінили порядок колонок, тепер Lastname перший
            const headers = ['Lastname', 'Firstname', 'Score'];
            headers.forEach((text, index) => {
                const th = document.createElement('th');
                th.textContent = text;
                
                // --- Сортування по першому заголовку ---
                if (index === 0) { // Якщо це колонка Lastname
                    th.style.cursor = 'pointer'; // Робимо курсор у вигляді руки
                    
                    th.addEventListener('click', () => {
                        const tbody = table.querySelector('tbody');
                        const rows = Array.from(tbody.querySelectorAll('tr'));
                        
                        // Сортуємо масив рядків
                        rows.sort((rowA, rowB) => {
                            // Отримуємо текст з першої колонки (index 0)
                            const nameA = rowA.children[0].textContent;
                            const nameB = rowB.children[0].textContent;
                            
                            // localeCompare правильно порівнює рядки за алфавітом
                            return nameA.localeCompare(nameB);
                        });
                        
                        // Додаємо відсортовані рядки назад у таблицю
                        rows.forEach(row => tbody.appendChild(row));
                    });
                }
                
                headerRow.appendChild(th);
            });

            // Заголовок для колонки "Edit"
            const thAction = document.createElement('th');
            thAction.textContent = 'Edit';
            thAction.className = 'action-col'; 
            
            // Перевіряємо, чи увімкнений чекбокс на момент створення таблиці
            const editCheckbox = document.getElementById('editTableCheckbox');
            if (editCheckbox && editCheckbox.checked) {
                thAction.style.display = 'table-cell';
            } else {
                thAction.style.display = 'none';
            }
            headerRow.appendChild(thAction);
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Створюємо тіло таблиці та заповнюємо даними
            const tbody = document.createElement('tbody');
            usersData.forEach(user => {
                const tr = document.createElement('tr');
                
                const tdLast = document.createElement('td');
                tdLast.textContent = user.lastname;

                const tdFirst = document.createElement('td');
                tdFirst.textContent = user.firstname;
                
                const tdScore = document.createElement('td');
                tdScore.textContent = user.score;
                
                // Додаємо комірки у новому порядку
                tr.appendChild(tdLast);
                tr.appendChild(tdFirst);
                tr.appendChild(tdScore);

                // Комірка з кнопкою Delete
                const tdAction = document.createElement('td');
                tdAction.className = 'action-col';
                if (editCheckbox && editCheckbox.checked) {
                    tdAction.style.display = 'table-cell';
                } else {
                    tdAction.style.display = 'none';
                }
                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => {
                    tr.remove(); 
                    totalScore -= user.score;
                    if (sumDisplay) {
                        sumDisplay.textContent = `Score sum: ${totalScore}`;
                    }
                });
                
                tdAction.appendChild(deleteBtn);
                tr.appendChild(tdAction);

                tbody.appendChild(tr);
            });
            table.appendChild(tbody);

            // Додаємо готову таблицю в блок content
            content.appendChild(table);

            // Використовуємо метод reduce для додавання всіх score з масиву usersData
            let totalScore = usersData.reduce((sum, user) => sum + user.score, 0);
            
            // Оновлюємо текст у правій панелі
            if (sumDisplay) {
                sumDisplay.textContent = `Score sum: ${totalScore}`;
            }
        });

    }, 1000);

    // --- Робота з Left Panel (Таймер на 1 секунду) ---
    setTimeout(() => {
        // Знаходимо та видаляємо лоадер у лівій панелі
        const loaderInLeft = leftPanel.querySelector('.loader');
        if (loaderInLeft) {
            loaderInLeft.remove();
        }

        // Створюємо поле вводу
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Enter text...';

        // Створюємо кнопку пошуку
        const searchBtn = document.createElement('button');
        searchBtn.textContent = 'Search';

        // Додаємо елементи в ліву панель
        leftPanel.append(searchInput, searchBtn);

        // Обробник натискання на кнопку пошуку
        searchBtn.addEventListener('click', () => {
            const searchText = searchInput.value.toLowerCase().trim();
            const table = document.getElementById('usersTable');
            
            // Якщо таблиці ще немає (користувач не натиснув Get Users), перериваємо пошук
            if (!table) return; 

            // Отримуємо всі рядки таблиці (крім заголовків)
            const rows = table.querySelectorAll('tbody tr');

            rows.forEach(row => {
                // Завжди знімаємо попереднє виділення перед новим пошуком
                row.classList.remove('highlight');
                
                // Якщо поле не порожнє і текст рядка містить шуканий фрагмент
                if (searchText !== '' && row.textContent.toLowerCase().includes(searchText)) {
                    row.classList.add('highlight'); // Додаємо клас виділення
                }
            });
        });

    }, 1000);

    // --- Робота з Right Panel (Таймер на 1 секунду) ---
    setTimeout(() => {
        // Знаходимо та видаляємо лоадер у правій панелі
        const loaderInRight = rightPanel.querySelector('.loader');
        if (loaderInRight) {
            loaderInRight.remove();
        }

        // Створюємо елемент для відображення суми
        sumDisplay = document.createElement('h3');
        sumDisplay.textContent = 'Waiting for data';

        // Додаємо елемент у праву панель
        rightPanel.appendChild(sumDisplay);

        const editLabel = document.createElement('label');
        editLabel.style.display = 'block'; // Щоб чекбокс був з нового рядка
        editLabel.style.marginTop = '10px';
        
        const editCheckbox = document.createElement('input');
        editCheckbox.type = 'checkbox';
        editCheckbox.id = 'editTableCheckbox';
        
        editLabel.appendChild(editCheckbox);
        editLabel.appendChild(document.createTextNode(' Edit table'));
        rightPanel.appendChild(editLabel);

        // Обробник події: показуємо/ховаємо колонку при перемиканні чекбокса
        editCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            // Шукаємо всі елементи з класом action-col
            const actionCols = document.querySelectorAll('.action-col');
            actionCols.forEach(col => {
                col.style.display = isChecked ? 'table-cell' : 'none';
            });
        });
    }, 1000);
}

init();