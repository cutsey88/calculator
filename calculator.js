const outputWindow = document.querySelector('#output');
const liveOutputWindow = document.querySelector('#liveOutput');
const num0 = document.querySelector('#num0');
const num1 = document.querySelector('#num1');
const num2 = document.querySelector('#num2');
const num3 = document.querySelector('#num3');
const num4 = document.querySelector('#num4');
const num5 = document.querySelector('#num5');
const num6 = document.querySelector('#num6');
const num7 = document.querySelector('#num7');
const num8 = document.querySelector('#num8');
const num9 = document.querySelector('#num9');
const decimalPoint = document.querySelector('#decimalPoint');
const equalSign = document.querySelector('#equalSign');

const displayButtons = document.querySelectorAll('.displayButton');
displayButtons.forEach((item) => {item.addEventListener('click', updateDisplay)});
equalSign.addEventListener('click', operate);

let operationArray = [];
let outputArray = [];

function sum(array) {
    return [array[0] + array[2]];
}

function subtract(array) {
    return [array[0] - array[2]];
}

function multiply(array) {
    return [array[0] * array[2]];
}

function divide(array) {
    return [array[0] / array[2]];
}

function mergeNumbers(array) {
    for (i = 0; i < array.length; i++) {
        while ((!isNaN(Number(array[i])) || array[i] == '.') && 
        (!isNaN(Number(array[i + 1])) || array[i + 1] == '.')) {
            array[i] = array[i].toString() + array[i + 1].toString();
            array.splice(i + 1, 1);
        }
        if (!isNaN(Number(array[i]))) {
            array[i] = Number(array[i]);
        }
    }
}

function operate() {
    let output = [];
    mergeNumbers(operationArray);
    console.log(operationArray);
}

function updateDisplay() {
    if (isNaN(Number(this.textContent))) {
        operationArray.push(this.textContent);
    } else {
        operationArray.push(Number(this.textContent));
    }
    
    if (isNaN(Number(this.textContent))) {
        outputArray.push(' ',this.textContent,' ');
    } else {
        outputArray.push(this.textContent);
    }
    outputWindow.textContent = outputArray.join('');
    console.log(this.textContent);
    console.log(typeof this.textContent);
}
