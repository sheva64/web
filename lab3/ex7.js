function getUser(id) {
    const users = [
        { id: 0, name: "Bohdan", age: 20, city: "Kyiv" },
        { id: 1, name: "Max", age: 31, city: "Bern" },
        { id: 2, name: "Andriy", age: 22, city: "Cherkasy" },
        { id: 3, name: "Sofia", age: 27, city: "Kharkiv" }
    ];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(user => user.id === id);
            if (user) {
                resolve(user);
            }
            else {
                reject(new Error(`User with id ${id} not found`));
            }
        }, 1000);
       
    });
}

async function loadUsers(ids) {
    const results = await Promise.allSettled(
        ids.map(id => getUser(id))
    );

    const users = [];
    
    results.forEach(result => {
        if (result.status === "fulfilled") {
            users.push(result.value);
        } else {
            console.error(result.reason.message);
        }
    });

    return users;
}

async function showUsers(ids) {
    console.log("loading");

    try {
        const users = await loadUsers(ids);
        console.log("Loaded users:", users);
    } catch (error) {
        console.error("Error:", error.message);
    } finally {
        console.log("loading finished");
    }
}

showUsers([0, 1, 5, 2]);