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
const back = document.querySelector('#back');
const clear = document.querySelector('#clear');
const displayButtons = document.querySelectorAll('.displayButton');
const opsButtons = document.querySelectorAll('.opsButtons');

displayButtons.forEach((item) => {item.addEventListener('click', enterValue)});
equalSign.addEventListener('click', operate);
back.addEventListener('click', backSpace);
clear.addEventListener('click', clearAll);

let theNumbers = [num0, num1, num2, num3, num4, num5, num6, num7, num8, num9];

let operationArray = [];
let outputArray = [];
let hitVal;
let justOperated;

function sumSubtract(array) {
    let plusIndex;
    let minusIndex;
    while(array.findIndex(item => item == '+') != -1 || 
    array.findIndex(item => item == '-') != -1) {
        plusIndex = array.findIndex(item => item == '+');
        minusIndex = array.findIndex(item => item == '-');
        if ((plusIndex < minusIndex || minusIndex == -1) && plusIndex != -1) {
            array[plusIndex - 1] = array[plusIndex - 1] + array[plusIndex + 1];
            array.splice(plusIndex, 2);
        } else if (minusIndex < plusIndex || plusIndex == -1) {
            array[minusIndex - 1] = array[minusIndex - 1] - array[minusIndex + 1];
            array.splice(minusIndex, 2);
        }
    }
}


function multiply(array) {
    let xIndex;
    while(array.findIndex(item => item == 'x') != -1) {
        xIndex = array.findIndex(item => item == 'x');
        array[xIndex - 1] = array[xIndex - 1] * array[xIndex + 1];
        array.splice(xIndex, 2);
    }
}

function divide(array) {
    let divIndex;
    while(array.findIndex(item => item == '÷') != -1) {
        divIndex = array.findIndex(item => item == '÷');
        array[divIndex - 1] = array[divIndex - 1] / array[divIndex + 1];
        array.splice(divIndex, 2);
    }
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

function enterValue() {
    if (justOperated && theNumbers.some((num) => num === this)) {
        return;
    } else {
        hitVal = this.textContent;
        if (checkDoubleOperator()) {
            console.log(operationArray);
            console.log(outputArray);
            return;
        } else {
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
            justOperated = false;
        }
    }
    liveOutputWindow.textContent = '';
    console.log(operationArray);
    console.log(outputArray);
}

function updateLiveDisplay() {

}

function backSpace() {
    if (outputArray[outputArray.length -1] == ' ') {
        outputArray.splice(-3, 3);
    } else {
        outputArray.splice(-1, 1);
    }
    operationArray.splice(-1, 1);
    outputWindow.textContent = outputArray.join('');
    justOperated = false;
    console.log(operationArray);
    console.log(outputArray);
    liveOutputWindow.textContent = '';
}

function clearAll() {
    operationArray = [];
    outputArray = [];
    outputWindow.textContent = outputArray;
    justOperated = false;
    liveOutputWindow.textContent = '';
}

function calculate(array) {
    mergeNumbers(array);
    multiply(array);
    divide(array);
    sumSubtract(array);
}

function checkDivByZero() {
    let zeroCheck = operationArray.slice();
    calculate(zeroCheck);
    if (isFinite(zeroCheck[0])) {
        return false;
    } else {
        return true;
    }
}

function checkEndOperator() {
    let sign;
    for (i = 0; i < opsButtons.length; i++) {
        sign = opsButtons[i].textContent;
        if (sign === operationArray[operationArray.length -1]) {
            return true;
        }
    }
}

function checkDoubleOperator() {
    let endSign;
    let endInOp;
    let hitSign;
    let hitOp;
    
    for (i = 0; i < opsButtons.length; i++) {
        endSign = opsButtons[i].textContent;
        if (endSign === operationArray[operationArray.length -1]) {
            endInOp = true;
            break;
        }
    }
    for (i = 0; i < opsButtons.length; i++) {
        hitSign = opsButtons[i].textContent;
        if (hitSign === hitVal) {
            hitOp = true;
            break;
        }
    }
    if (endInOp && hitOp) {
        return true;
    }
}

function operate() {
    if (checkEndOperator()) {
        console.log(operationArray[operationArray.length -1]);
        return;
    } else {
        if (checkDivByZero()) {
            liveOutputWindow.textContent = 'Can\'t divide by 0';
        } else {
            calculate(operationArray);
            outputArray = operationArray.slice();
            outputWindow.textContent = outputArray;
            justOperated = true;
            console.log(operationArray);
        }
    }
}