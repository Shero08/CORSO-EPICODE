
let exampleArray = [
    { id: 1, name: 'Carlo', surname: 'Capuozzo' },
    { id: 2, name: 'John', surname: 'Smith' },
    { id: 3, name: 'Alberto', surname: 'Sordi' },
    { id: 4, name: 'Davide', surname: 'Esposito' },
    { id: 5, name: 'Salvatore', surname: 'Giusti' },
];

//Find method using arrow function
const findName = exampleArray.find(element => element.name === 'Carlo');
console.log(findName)

//Find method using normal function
function isJohn(person) {
    return person.name === "John";
}
console.log(exampleArray.find(isJohn)); // { name: 'John' }


//Il metodo filter ritorna un array di elementi contenente tutte le corrispondenze trovate
//Filter method using arrow function
const filterPerson = exampleArray.filter(person => person.id > 1);
console.log(filterPerson);

const filterPerson2 = exampleArray
    .filter(person => person.id > 1)
    .filter(person => person.id < 4)

console.log(filterPerson2);
  