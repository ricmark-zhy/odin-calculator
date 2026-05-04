const calculator = document.querySelector('#calculator');
const curr_operand = document.querySelector('#current_operand');
const prev_operand = document.querySelector('#previous_operand');

let firstNum = '', secondNum = '', input = '';
let shiftToSecond = false;
let currentOperator = '';

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

function handleNumber(button){
  let current = shiftToSecond ? secondNum : firstNum;
  if (button === '.' && current.includes('.')) return;
  current += button;
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

let operators = '÷×+−';
let isOperator = (operator) => {
  if (operators.includes(operator)){
    return true;
  }
  return false;
}