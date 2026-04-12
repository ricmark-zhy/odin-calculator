//create an object of operation functions 
const operators = {
  plus: (num1, num2) => num1 + num2,
  minus: (num1, num2) => num1 - num2,
  divide: (num1, num2) => num1 / num2,
  times: (num1, num2) => num1 * num2,
}

let num1 = 4, num2 = 10;

function operate(num1, num2, operator){
  return operator(num1, num2);
}

let word = 'times';

let operator = operators[word];

let result = operate(num1, num2, operator);

console.log(result)

//create a function that update the display when number buttons are click