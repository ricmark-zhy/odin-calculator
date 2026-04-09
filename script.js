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

const calculator = document.querySelector('#calculator');
const display = document.querySelector('#display');

let firstNum = [];

calculator.addEventListener(('click'), (event) => {
  const btn = event.target.closest('button');
  let value = btn.id;
  let position = firstNum;
  
  firstNum.push(Number(btn.id));
  display.value = firstNum.join('');

  console.table(firstNum);
      

  
})