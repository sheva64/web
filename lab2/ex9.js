function greet(city, country) {
    console.log(`Hello, I am ${this.name} from ${city}, ${country}`);
}
  
const person = {
    name: "Bohdan"
};

greet.call(person, "Kyiv", "Ukraine"); // передаємо список аргументів, this = person, аргументи передаються окремо
greet.apply(person, ["Brovary", "Ukraine"]); // передаємо масив аргументів
const greetPerson = greet.bind(person, "Cherkasy", "Ukraine"); // створюємо нову функцію, яка не викликається одразу
greetPerson();