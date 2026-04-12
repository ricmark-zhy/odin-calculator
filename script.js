//create an object of operation functions 
const operators = {
  plus: (num1, num2) => num1 + num2,
  minus: (num1, num2) => num1 - num2,
  divide: (num1, num2) => num1 / num2,
  times: (num1, num2) => num1 * num2,
}

let num1 = 4, num2 = 10;

function operate(num1, num2, operator){
  num1 = Number(num1);
  num2 = Number(num2);
  return operator(num1, num2).toString();
}

let word = 'times';

let symbol = operators[word];

let result = operate(num1, num2, symbol);

console.log(result)

//create a function that update the display when number buttons are click

const calculator = document.querySelector('#calculator');
const display = document.querySelector('#display');

let firstNum = '', secondNum = '';
let shiftToSecond = false;
let currentOperator = '', nextOperator = '';

calculator.addEventListener('click', event => {
  //if target is not a button, cancel
  if(!event.target.closest('button')){
    return;
  }
  const button = event.target.id;

  if (isNumber(button)){

    if (!shiftToSecond){
      firstNum += getValue(button, firstNum);
      display.value = firstNum;
    } else {
      secondNum += getValue(button, secondNum);
      display.value = secondNum;
    }

  } else if (isOperator(button)){
    shiftToSecond = true;
    if (!secondNum){
      currentOperator = button;
    } else if (button == 'equals') {
      let operator = operators[currentOperator];
      firstNum = operate(firstNum, secondNum, operator);
      display.value = firstNum;
      secondNum = '';
      shiftToSecond = false;
    }
  }

});


// helper functions

let getValue = (button, storage) => {
  
  if (button == '.'){ //handles decimal
    if (!storage){
      return '0.'; //convert to this when decimal are entered first
    } else if (storage.includes('.')){
      return ''; //return nothing if decimal are already present.
    } else {
      return '.';
    } 
  } else {
    return button;
  }

}

const numbers = '1234567890.';
let isNumber = button => {
  return numbers.includes(button);
}
const operations = ['plus', 'minus', 'times', 'divide', 'equals'];
let isOperator = button => {
  if (operations.includes(button)){
    return true;
  }
}

let a = 'plus';

console.log(isOperator(a));


