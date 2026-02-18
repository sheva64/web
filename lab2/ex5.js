function createGreeting() {
    let lastName = null;
    let lastGreeting = null;
  
    return function getGreeting(name) {
      if (name === lastName) {
        return lastGreeting; // повертаємо кеш
      }
  
      lastName = name;
      lastGreeting = `Hello ${name}`;
      return lastGreeting;
    };
}

const getGreeting = createGreeting();
console.log(getGreeting("Bohdan"));
console.log(getGreeting("Bohdan")); // кешоване значення
console.log(getGreeting("Max"));