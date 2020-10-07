const display = document.querySelector('.calculator__display');
const numbers = document.querySelectorAll('.control__button--number');
const operations = document.querySelectorAll('.control__button--operation');
const clean = document.querySelectorAll('.control__button--clean');

let displayedValue = 0;
let isOperationClicked = false;
let operation = '';

numbers.forEach((number) => {
  number.addEventListener('click', (e) => {
    if (isOperationClicked) {
      display.textContent = '';
      isOperationClicked = false;
    }
    if (display.textContent === '0') {
      display.textContent = '';
    }
    if (display.textContent.length < 10 && e.target.textContent !== '.') {
      display.textContent += e.target.innerText;
    }
    if (display.textContent.indexOf('.') === -1 && e.target.textContent === '.') {
      if (display.textContent === '') {
        display.textContent += '0.';
      } else {
        display.textContent += '.';
      }
    }
  });
});

operations.forEach((oper) => {
  oper.addEventListener('click', (e) => {
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
      }
    }
    isOperationClicked = true;
    operation = e.target.textContent;
    display.textContent = String(displayedValue).length > 10 ? String(displayedValue).slice(0,10) : displayedValue;
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
