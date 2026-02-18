const capitalizeProperty = (arr, prop) =>
    arr.map(obj => ({
      ...obj, // копіюєм всі властивості об’єкта
      [prop]: obj[prop].charAt(0).toUpperCase() + obj[prop].slice(1) // [prop] - динамічна назва властивості
    }));

const users = [
  { name: "bohdan", age: 20 },
  { name: "max", age: 21 }
];

console.log(capitalizeProperty(users, "name"));