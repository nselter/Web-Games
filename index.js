// JAVASCRIPT is Dynamic!!!


let string = 'String Literal'; // String literal
let number = 0; // Number literal
let isBoolean = true; // Boolean literal
let nul = null;

document.body.addEventListener

// Objects
let Person = {
    fristName: 'Noah',
    lastName: 'Selter',
    age: 20
};

//Dot notation
Person.fristName = 'John'

// Bracket Notation
let valToChange = 'lastName';
Person[valToChange] = 'Smith';

console.log(Person.fristName);
console.log(Person.lastName);


// Arrays
let selectedColors = ['Red', 'Blue'];
console.log(selectedColors);
console.log(selectedColors[0]);

selectedColors[2] = 1;
console.log(selectedColors);
console.log(selectedColors.length);


// Functions
function greet(firstName, lastName) { // Parameter when defining
    console.log('Hello '+ firstName+" "+ lastName);
}

greet(Person.fristName, Person.lastName); // Argument when calling

// Calculating fuinction
function square(number) {
    return number * number;
}
console.log(square(2));
