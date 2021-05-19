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
displayButtons.forEach((item) => {item.addEventListener('mouseenter', poop)});

let operationArray = [5,'+',6];

outputWindow.textContent = operationArray.join(' ');

function operate() {
    let output = [];
}

function poop() {
    operationArray = ['poop','pooper'];
    outputWindow.textContent = operationArray.join(' ');
    console.log('poop');
}
