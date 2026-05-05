const calculator = document.querySelector('#calculator');
const curr_operand = document.querySelector('#current_operand');
const prev_operand = document.querySelector('#previous_operand');

let firstNum = '', secondNum = '', input = '';
let shiftToSecond = false;
let currentOperator = '';

let operators = '÷×+−';
let isOperator = (operator) => {
  return operators.includes(operator) ? true : false;
}

calculator.addEventListener('click', event => {
  if (event.target.closest('button')){
    let button = event.target.id;
    if (!isNaN(button) || button === '.'){
      handleNumber(button);
      updateDisplay();
    } else if (isOperator(button) || button === 'equals'){
      chooseOperator(button);
      updateDisplay();
    } else if (button === 'delete'){
      del();
      updateDisplay();
    } else if (button === 'clear'){
      clear();
      updateDisplay();
    } else if (button === 'sign'){
      changeSign();
      updateDisplay();
    }
  }
});

function convertOpkeys(key){
  if (key === '-'){
    return '−';
  } else if (key === '/'){
    return '÷';
  } else if (key === '*'){
    return '×';
  } else if (key === '=' || key === 'Enter'){
    return 'equals';
  } else {
    return '+';
  }
}

let operatorKeys = '+-/*=';

// document.body.addEventListener('keyup', (event) => {
//   if (event.key === 'Enter')
// })

document.body.addEventListener('keydown', (event) => {
  let key = event.key;

  if (event.key === 'Enter'){
    event.preventDefault();
    key = 'Enter';
  }

  if(!isNaN(key) || key === '.'){
    handleNumber(key);
    updateDisplay();
  } else if (event.altKey && key === '-'){
    event.preventDefault();
    changeSign();
    updateDisplay();
  } else if (operatorKeys.includes(key) || key === 'Enter'){
    let operator = convertOpkeys(key);
    chooseOperator(operator);
    updateDisplay();
  } else if (key === 'Delete'){
    clear();
    updateDisplay();
  } else if (key === 'Backspace'){
    del();
    updateDisplay();
  } 
})

function handleNumber(button){
  let numString = button.toString();
  let current = shiftToSecond ? secondNum : firstNum;
  if (numString === '.' && current.includes('.')) return;
  current += numString;
  !shiftToSecond ? (firstNum = current) : (secondNum = current);
}

function updateDisplay(){
  if (!shiftToSecond){
    prev_operand.textContent = '';
    curr_operand.textContent = firstNum;
  } else {
    prev_operand.textContent = firstNum + "" + currentOperator;
    curr_operand.textContent = secondNum;
  }
}

function handleEquals() {
  if (currentOperator && secondNum) {
    operate(currentOperator);
    shiftToSecond = false;
    currentOperator = '';
    prev_operand.textContent = '';
    secondNum = '';
  }
}

let isZeroDivision = () => {
  if((firstNum === '0' || secondNum === '0') && currentOperator === '÷'){
    return true;
  }
  return false;
}

function chooseOperator(button){

  if(!firstNum){
    return;
  }

  if (isZeroDivision()){
    alert('dividing to 0 is not allowed. delete or clear your input!');
    return;
  }

  if (button === 'equals'){
    handleEquals();
    return;
  }

  shiftToSecond = true;

  if (!secondNum){
    currentOperator = button;
  } else {
    operate(currentOperator);
    currentOperator = button;
    secondNum = '';
  }
}

function operate (operator){
  let a = Number(firstNum);
  let b = Number(secondNum);

  switch (operator){
    case '+':
      firstNum = a + b;
      break;
    case '÷':
      firstNum = a / b;
      break;
    case '×':
      firstNum = a * b;
      break;
    case '−':
      firstNum = a - b;
      break;
  }

  firstNum = firstNum.toString();
}

function del(){
  if (!secondNum){
    currentOperator = '';
  }
  if (!shiftToSecond){
    firstNum = firstNum.slice(0, -1);
  } else {
    secondNum = secondNum.slice(0, -1);
  }
  if (!currentOperator){
    shiftToSecond = false;
  }
}

function clear(){
  shiftToSecond = false;
  firstNum = '';
  secondNum = '';
  currentOperator = '';
  prev_operand.textContent = '';
  curr_operand.textContent = '';
}

function changeSign(){
  let current = shiftToSecond ? secondNum : firstNum;

  current.includes('-') ? current = current.slice(1) : current = '-' + current;

  !shiftToSecond ? (firstNum = current) : (secondNum = current);
  
}

const currentYear = new Date().getFullYear();
const author = document.querySelector('.author');
author.textContent += currentYear;