let number = document.querySelectorAll('[data-number]')
let operationField = document.querySelectorAll('[data-operation]');
let operationFieldX = document.querySelectorAll('[data-operation-x]');
let equals = document.querySelector('[data-equals]');
let clearEntryField = document.querySelector('[data-clear-entry]');
let allClear = document.querySelector('[data-all-clear]');
let previousField = document.querySelector('[data-previous]');
let currentField = document.querySelector('[data-current]');
const keyTableNumbers = ['0','1','2','3','4','5','6','7','8','9','.'];
const keyTableOperations = ['/','*','+','-'];
const keyTableOperationsX = [];
let operation = '';
let current = '';
let previous = '';
let result = '';

function addNumber(number) {
    if(current === Infinity) clearAll();
    if (current.length > 15) return;
    if (number === '.' && current.toString().includes('.')) return;
    if (!(number.match(/[0-9]|\./))) return;
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
        case '/':
            if (curr == 0) {
                previous = '';
                previousField.innerText = '';
                current = '';
                currentField.innerText = 'błąd';
                return;
            }
            result = prev / curr;
            break;
        case '*':
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

function calculateX(signX){
    const currX = parseFloat(current);
    const prevX = parseFloat(previous);
    
    if (!isNaN(prevX) || isNaN(currX)) return;
    switch(signX){
        case '√':
            result = Math.sqrt(currX);
            break;
        case 'x²':
            result = currX*currX;
            break;
        default: 
            return;
    }
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

operationFieldX.forEach(button => {
    button.addEventListener('click', () => {
        calculateX(button.innerText);
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

document.addEventListener('keydown', e => {
    console.log(e)
    if(keyTableNumbers.includes(e.key)){
        addNumber(e.key);
        display();    
    }
    if(keyTableOperations.includes(e.key)){
        mathOperation(e.key);
        display();
    }
    if(e.key == 'Enter'){
        calculate();
    }
    if(e.key == '@'){
        calculateX('√')
    }
    if(e.key == '^'){
        calculateX('x²')
    }
    if(e.key == 'Delete'){
        clearEntry();
    }
    if(e.key == 'Escape'){
        clearAll();
    }
    if(e.key == 'Backspace'){
        if(current.length>0){
            current = current.slice(0,-1);
            display();
        }
    }
}); 