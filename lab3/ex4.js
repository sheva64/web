function getUser(id) {
    const users = [
        { id: 0, name: "Bohdan", age: 20, city: "Kyiv" },
        { id: 1, name: "Max", age: 31, city: "Bern" },
        { id: 2, name: "Andriy", age: 22, city: "B" },
        { id: 3, name: "Sofia", age: 27, city: "Kharkiv" }
    ];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(user => user.id === id);
            if (user) {
                resolve(user);
            }
            else {
                reject(new Error("User not found"));
            }
        }, 1000);
       
    });
}

getUser(6)
.then(user => console.log(user))
.catch(error => console.error(error.message));