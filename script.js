let number = document.querySelectorAll('[data-number]')
let operationField = document.querySelectorAll('[data-operation]');
let equals = document.querySelector('[data-equals]');
let clearEntryField = document.querySelector('[data-clear-entry]');
let allClear = document.querySelector('[data-all-clear]');
let previousField = document.querySelector('[data-previous]');
let currentField = document.querySelector('[data-current]');

let operation = '';
let current = '';
let previous = '';
let result = '';

function addNumber(number) {
    console.log(current)
    if (number === '.' && current.toString().includes('.')) return;
    current = current.toString() + number.toString();
}

function display() {
    currentField.innerText = current;
    previousField.innerText = previous;
}

function mathOperation(sign) {
    if (current === '') return
    if (previous !== '')
        calculate()
    operation = sign;
    previous = current + " " + sign;
    current = '';
}

function calculate() {
    const prev = parseFloat(previous)
    const curr = parseFloat(current)
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operation) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '÷':
            if (curr == 0) {
                previous = '';
                previousField.innerText = '';
                current = '';
                currentField.innerText = 'błąd';
                return;
            }
            result = prev / curr;
            break;
        case '×':
            result = prev * curr;
            break;
        default:
            return
    }
    previous = '';
    previousField.innerText = '';
    current = result;
    currentField.innerText = result;
    operation = undefined;
}

function clearAll() {
    previousField.innerText = '';
    previous = '';
    currentField.innerText = '';
    current = '';
    operation = undefined;
}

function clearEntry() {
    currentField.innerText = '';
    current = '';
    operation = undefined;
}

number.forEach(button => {
    button.addEventListener('click', () => {
        addNumber(button.innerText)
        display()
    })
})

operationField.forEach(button => {
    button.addEventListener('click', () => {
        mathOperation(button.innerText)
        display()
    })
})

equals.addEventListener('click', button => {
    calculate();
})

allClear.addEventListener('click', () => {
    clearAll();
})
clearEntryField.addEventListener('click', () => {
    clearEntry();
})