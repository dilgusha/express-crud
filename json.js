const data = { name: "John", age: 30, city: "New York" };

// JSON.stringify(data) :
console.log(JSON.stringify(data));
// Netice: {"name":"John","age":30,"city":"New York"}

// JSON.stringify(data, null, 2) :
console.log(JSON.stringify(data, null, 2));
/*
Netice:
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
*/


// JSON.stringify(value, replacer, space)

