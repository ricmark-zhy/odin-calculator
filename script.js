const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

console.log(add(1, 4));

let firstNumber, secondNumber, operator;

function operate (firstNumber, secondNumber, operator) {
  return operator(firstNumber, secondNumber); 
} 

console.log(operate(1, 6, add));