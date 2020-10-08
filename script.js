const display = document.querySelector('.calculator__display');
const numbers = document.querySelectorAll('.control__button--number');
const operations = document.querySelectorAll('.control__button--operation');
const clean = document.querySelectorAll('.control__button--clean');

let displayedValue = 0;
let isOperationClicked = false;
let operation = '';

const dataInput = (value) => {
  if (isOperationClicked) {
    display.textContent = '';
    isOperationClicked = false;
  }
  if (display.textContent === '0') {
    display.textContent = '';
  }
  if (display.textContent.length < 10 && value !== '.') {
    display.textContent += value;
  }
  if (display.textContent.indexOf('.') === -1 && value === '.') {
    if (display.textContent === '') {
      display.textContent += '0.';
    } else {
      display.textContent += '.';
    }
  }
}

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
}


document.addEventListener('keyup', (e) => {
  if (/([0-9]|\.)/.test(e.key)) {
    dataInput(e.key);
  }
  if (/(\/|\*|\-|\+|Enter)/.test(e.key)) {
    changeOperation(e.key);
  }
});

numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    dataInput(e.target.textContent);
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
