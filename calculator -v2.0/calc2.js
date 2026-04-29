const calculator = document.querySelector('#calculator');
const curr_operand = document.querySelector('#current_operand');
const prev_operand = document.querySelector('#previous_operand');

const operators = {
  plus: (num1, num2) => num1 + num2,
  minus: (num1, num2) => num1 - num2,
  divide: (num1, num2) => num1 / num2,
  times: (num1, num2) => num1 * num2,
}

function operate (num1, num2, operator){
  num1 = Number(num1);
  num2 = Number(num2);
  return operator(num1, num2).toString();
}

let firstNum = '', secondNum = '', input = '';
let shiftToSecond = false;

calculator.addEventListener('click', event => {
  
  if (!event.target.closest('button')){
    return;
  }

  const button = event.target.id;

  handleClick(button);

});

function handleClick(button){
  if (isNumber(button)){
    handleNum(button);
  } else if (button === '.'){
    handleDecimal();
  } else if (button === 'sign'){
    changeSign();
  }
}

function handleNum(button){
  input += button;
  if (!shiftToSecond){
    firstNum += input;
  } else {
    secondNum += input;
  }
  updateDisplay();
}

function handleDecimal(){
  if (!input){
    input = '0.';
  } else if (input.includes('.')){
    input += '';
  } else {
    input += '.';
  }
  updateDisplay();
}

function changeSign(){
  if (!input){
    input = '-0'
  } else if (input.includes('-')){
    input = input.slice(1);
  } else {
    input = '-' + input;
  }
  updateDisplay();
}

function updateDisplay(){
  if (!secondNum){
    firstNum = input;
    curr_operand.textContent = firstNum;
  } else {
    
  }
}



const digits = '123456789';

let isNumber = (button) => {
  if (digits.includes(button)){
    return true;
  }
  return false;
}

let a = '9';
console.log(isNumber(a));