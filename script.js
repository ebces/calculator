const display = document.querySelector('.calculator__display');
const numbers = document.querySelectorAll('.control__button--number');
const operations = document.querySelectorAll('.control__button--operation');
const clean = document.querySelectorAll('.control__button--clean');

let displayedValue = 0;
let isOperationClicked = false;
let operation = '';

const getValue = (currentValue, value) => {
  const isCorrectNumber = currentValue.length < 10 && value !== '.';
  const isDot = currentValue.indexOf('.') === -1 && value === '.';
  let result = currentValue;

  if (isOperationClicked) {
    isOperationClicked = false;
    result = '';
  }
  if (result === '0') {
    result = '';
  }
  if (isCorrectNumber) {
    result += value;
  }
  if (isDot) {
    if (result === '') {
      result += '0.';
    } else {
      result += '.';
    }
  }

  return result;
};

const changeDisplayedValue = (value) => {
  display.textContent = getValue(display.textContent, value);
};

const changeOperation = (value) => {
  if (!operation) {
    displayedValue = Number(display.textContent);
  }
  if (!isOperationClicked) {
    switch (operation) {
      case '+':
        displayedValue += Number(display.textContent);
        break;
      case '-':
        displayedValue -= Number(display.textContent);
        break;
      case '/':
        displayedValue /= Number(display.textContent);
        break;
      case '*':
        displayedValue *= Number(display.textContent);
        break;
      case '=':
        displayedValue = Number(display.textContent);
        break;
      case 'Enter':
        displayedValue = Number(display.textContent);
        break;
    }
  }
  isOperationClicked = true;
  operation = value;
  display.textContent = String(displayedValue).length > 10 ? String(displayedValue).slice(0, 10) : displayedValue;
};

document.addEventListener('keyup', (e) => {
  if (/([0-9]|\.)/.test(e.key)) {
    changeDisplayedValue(e.key);
  }
  if (/(\/|\*|\-|\+|Enter)/.test(e.key)) {
    changeOperation(e.key);
  }
});

numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    changeDisplayedValue(e.target.textContent);
  });
});

operations.forEach((oper) => {
  oper.addEventListener('click', (e) => {
    changeOperation(e.target.textContent);
  });
});

clean.forEach((cleanButton) => {
  cleanButton.addEventListener('click', (e) => {
    if (e.target.textContent === 'C') {
      displayedValue = 0;
      isOperationClicked = false;
      operation = '';
      display.textContent = 0;
    }
    if (e.target.textContent === 'CE') {
      display.textContent = 0;
    }
  });
});
