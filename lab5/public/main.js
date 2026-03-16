async function init() {
    const rootMain = document.getElementById('main');
    let sumDisplay;
    
    let currentUsersCount = 20; 
    let currentUsersDiv; 

    const header = document.createElement('header');
    const mainContent = document.createElement('main');
    const footer = document.createElement('footer');
    rootMain.append(header, mainContent, footer);

    const leftPanel = document.createElement('div'); leftPanel.id = 'leftPanel';
    const content = document.createElement('div'); content.id = 'content';
    const rightPanel = document.createElement('div'); rightPanel.id = 'rightPanel';
    mainContent.append(leftPanel, content, rightPanel);

    // Допоміжна функція для створення лоадера
    const createLoader = () => {
        const loader = document.createElement('div');
        loader.className = 'loader';
        return loader;
    };

    // Лоадери при завантаженні сторінки
    leftPanel.appendChild(createLoader());
    content.appendChild(createLoader());
    rightPanel.appendChild(createLoader());

    // --- Робота з Footer ---
    try {
        const response = await fetch('/api/newUsers');
        const lastFiveUsers = await response.json();
        
        currentUsersDiv = document.createElement('div');
        currentUsersDiv.textContent = `Current users: ${currentUsersCount}`;
        
        const newUsers = document.createElement('div');
        const names = lastFiveUsers.map(user => user.firstname).join(', ');
        newUsers.textContent = `New users: ${names}`;
        
        footer.append(currentUsersDiv, newUsers);
    } catch (e) {
        console.error("Помилка завантаження футера", e);
    }

    // --- Робота з Header ---
    const buttons = ['User Rating', 'News', 'Contacts', 'About', 'Gallery'];
    const contentHeading = document.createElement('h2');

    buttons.forEach(btnText => {
        const btn = document.createElement('button');
        btn.textContent = btnText;
        
        btn.addEventListener('click', async () => {
            contentHeading.textContent = btnText;
            
            if (btnText !== 'User Rating') {
                content.innerHTML = '';
                content.appendChild(contentHeading);
            }

            if (btnText === 'Gallery') {
                await renderGallery(content);
            } else if (btnText !== 'User Rating') {
                const text = document.createElement('p');
                text.textContent = `Content for ${btnText}`;
                content.appendChild(text);
            } else {
                content.innerHTML = '';
                content.appendChild(contentHeading);
                renderUserRatingInitial();
            }
        });
        
        header.appendChild(btn);
    });

    // --- Функція для відмальовки User Rating ---
    function renderUserRatingInitial() {
        const noUsersText = document.createElement('span');
        noUsersText.textContent = 'No users ';
        
        const getUsersBtn = document.createElement('button');
        getUsersBtn.textContent = 'Get Users';
        getUsersBtn.id = 'getUsersBtn';

        content.append(noUsersText, getUsersBtn);

        let currentSortOrder = 'asc';

        getUsersBtn.addEventListener('click', async () => {
            getUsersBtn.disabled = true;
            
            await loadAndRenderTable('firstname', currentSortOrder);
            
            noUsersText.style.display = 'none';
            getUsersBtn.style.display = 'none';
        });

        async function loadAndRenderTable(sortBy, order) {
            const res = await fetch(`/api/users?sortBy=${sortBy}&order=${order}`);
            const usersData = await res.json();

            const oldTable = document.getElementById('usersTable');
            if (oldTable) oldTable.remove();

            const table = document.createElement('table');
            table.id = 'usersTable';
            table.style.width = '100%';
            
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            const columns = [
                { text: 'Lastname', field: 'lastname' },
                { text: 'Firstname', field: 'firstname' },
                { text: 'Score', field: '' }
            ];

            columns.forEach((col) => {
                const th = document.createElement('th');
                th.textContent = col.text;
                th.style.textAlign = 'left';
                
                if (col.field) {
                    th.style.cursor = 'pointer';
                    th.addEventListener('click', () => {
                        currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
                        loadAndRenderTable(col.field, currentSortOrder);
                    });
                }
                headerRow.appendChild(th);
            });

            const thAction = document.createElement('th');
            thAction.textContent = 'Edit';
            thAction.className = 'action-col';
            
            const editCheckbox = document.getElementById('editTableCheckbox');
            thAction.style.display = (editCheckbox && editCheckbox.checked) ? 'table-cell' : 'none';
            headerRow.appendChild(thAction);

            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement('tbody');
            let totalScore = 0;

            usersData.forEach(user => {
                totalScore += user.score;
                const tr = document.createElement('tr');
                
                const tdLast = document.createElement('td'); tdLast.textContent = user.lastname;
                const tdFirst = document.createElement('td'); tdFirst.textContent = user.firstname;
                const tdScore = document.createElement('td'); tdScore.textContent = user.score;
                
                tr.append(tdLast, tdFirst, tdScore);

                const tdAction = document.createElement('td');
                tdAction.className = 'action-col';
                tdAction.style.display = (editCheckbox && editCheckbox.checked) ? 'table-cell' : 'none';
                
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.addEventListener('click', () => {
                    tr.remove(); 
                    totalScore -= user.score; 
                    sumDisplay.textContent = `Score sum: ${totalScore}`; 

                    currentUsersCount--;
                    if (currentUsersDiv) {
                        currentUsersDiv.textContent = `Current users: ${currentUsersCount}`;
                    }
                });
                
                tdAction.appendChild(deleteBtn);
                tr.appendChild(tdAction);
                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            content.appendChild(table);

            sumDisplay.textContent = `Score sum: ${totalScore}`;
        }
    }

    // --- Робота з Content ---
    setTimeout(() => {
        const loaderInContent = content.querySelector('.loader');
        if (loaderInContent) loaderInContent.remove();
        renderUserRatingInitial();
    }, 1000);

    // --- Робота з Left Panel ---
    setTimeout(() => {
        const loaderInLeft = leftPanel.querySelector('.loader');
        if (loaderInLeft) loaderInLeft.remove();

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Enter text...';

        const searchBtn = document.createElement('button');
        searchBtn.textContent = 'Search';

        const weatherBlock = document.createElement('div');
        weatherBlock.style.marginTop = '20px';
        weatherBlock.style.padding = '10px';
        weatherBlock.style.border = '1px solid black';
        
        async function updateWeather() {
            try {
                const res = await fetch('/weather');
                const data = await res.json();
                weatherBlock.innerHTML = `<strong>Weather:</strong> ${data.city}, ${data.temperature}°C`;
            } catch (e) {
                weatherBlock.innerHTML = 'Weather unavailable';
            }
        }
        updateWeather();
        setInterval(updateWeather, 60000);

        leftPanel.append(searchInput, searchBtn, weatherBlock);

        searchBtn.addEventListener('click', () => {
            const searchText = searchInput.value.toLowerCase().trim();
            const table = document.getElementById('usersTable');
            if (!table) return; 

            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.classList.remove('highlight');
                if (searchText !== '' && row.textContent.toLowerCase().includes(searchText)) {
                    row.classList.add('highlight');
                }
            });
        });
    }, 1000);

    // --- Робота з Right Panel ---
    setTimeout(() => {
        const loaderInRight = rightPanel.querySelector('.loader');
        if (loaderInRight) loaderInRight.remove();

        sumDisplay = document.createElement('h3');
        sumDisplay.textContent = 'Waiting for data';

        const editLabel = document.createElement('label');
        editLabel.style.display = 'block'; 
        editLabel.style.marginTop = '10px';
        
        const editCheckbox = document.createElement('input');
        editCheckbox.type = 'checkbox';
        editCheckbox.id = 'editTableCheckbox';
        
        editLabel.appendChild(editCheckbox);
        editLabel.appendChild(document.createTextNode(' Edit table'));
        
        rightPanel.append(sumDisplay, editLabel);

        editCheckbox.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            const actionCols = document.querySelectorAll('.action-col');
            actionCols.forEach(col => {
                col.style.display = isChecked ? 'table-cell' : 'none';
            });
        });
    }, 1000);

    // --- Функція рендеру галереї ---
    async function renderGallery(container) {
        try {
            const res = await fetch('/api/gallery');
            const images = await res.json();

            const grid = document.createElement('div');
            grid.style.display = 'grid';
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(100px, 1fr))';
            grid.style.gap = '10px';
            grid.style.marginTop = '20px';

            if (images.length === 0) {
                grid.textContent = "Немає зображень у папці /public/gallery";
            }

            images.forEach(imgName => {
                const img = document.createElement('img');
                img.src = `/gallery/${imgName}`;
                img.style.width = '100%';
                img.style.height = '100px';
                img.style.objectFit = 'cover';
                img.style.borderRadius = '8px';
                grid.appendChild(img);
            });

            container.appendChild(grid);
        } catch (e) {
            container.textContent = "Помилка завантаження галереї";
        }
    }
}

init();