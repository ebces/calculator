const display = document.querySelector('.calculator__display');
const numbers = document.querySelectorAll('.control__button--number');
const operations = document.querySelectorAll('.control__button--operation');
const clean = document.querySelectorAll('.control__button--clean');

let temp = 0;
let operationClick = false;
let operation = '';

for (let i = 0; i < numbers.length; i += 1) {
  numbers[i].addEventListener('click', (e) => {
    if (operationClick) {
      display.textContent = '';
      operationClick = false;
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
}

for (let i = 0; i < operations.length; i += 1) {
  operations[i].addEventListener('click', (e) => {
    if (!operation) {
      temp = Number(display.textContent);
    }
    if (!operationClick) {
      switch (operation) {
        case '+':
          temp += Number(display.textContent);
          break;
        case '-':
          temp -= Number(display.textContent);
          break;
        case '/':
          temp /= Number(display.textContent);
          break;
        case '*':
          temp *= Number(display.textContent);
          break;
        case '=':
          temp = Number(display.textContent);
      }
    }
    operationClick = true;
    operation = e.target.textContent;
    display.textContent = temp;
  });
}

for (let i = 0; i < clean.length; i += 1) {
  clean[i].addEventListener('click', (e) => {
    if (e.target.textContent === 'C') {
      temp = 0;
      operationClick = false;
      operation = '';
      display.textContent = 0;
    }
    if (e.target.textContent === 'CE') {
      display.textContent = 0;
    }
  });
}
