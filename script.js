const displayScreen = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-button');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    if (awaitingNextValue) {
        displayScreen.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = displayScreen.textContent;
        displayScreen.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    if (awaitingNextValue) {
        return;
    }
    if (!displayScreen.textContent.includes('.')) {
        displayScreen.textContent = `${displayScreen.textContent}.`;
    }
}

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,

};

function useOperator(operator) {
    const currentValue = Number(displayScreen.textContent);
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        displayScreen.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

inputButtons.forEach((inputButton) => {
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    } else if (inputButton.classList.contains('operator')) {
        inputButton.addEventListener('click', () => useOperator(inputButton.value));
    } else if (inputButton.classList.contains('decimal')) {
        inputButton.addEventListener('click', () => addDecimal());
    }
});

function clearAll() {
    displayScreen.textContent = '0';
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
}

clearButton.addEventListener('click', clearAll);