const callWithContext = (obj, callback) => {
    return callback.call(obj);
}

const person = {
    name: 'Bohdan',
    age: 20
}
  
const birthdayGreeting = function() {
    const date = new Date().toLocaleDateString();
    console.log(`Today is ${date}! Happy birthday ${this.name}.`);
}
  
callWithContext(person, birthdayGreeting);