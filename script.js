const display = document.querySelector("#display");
let displayNum = '';
let result = 0; 
const numBtns = document.querySelectorAll(".number");
const opBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector("#equals");


const add = (a, b) => a+b;
const subtract = (a, b) =>  a-b;
const multiply = (a, b) => a*b;
const divide = (a, b) => a/b ;

let num1;
let num2;
let operator;

function operate(a, b, operator){
    return operator === "+" ? add(a, b)
    : operator === "-" ? subtract(a, b)
    : operator === "*" ? multiply(a, b)
    : operator === "/" ? divide(a, b)
    : "Please enter a valid operator (+, -, *, /)";
};

function processSum() {
    sumArr = displayNum.split(" ");
    num1 = sumArr[0];
    num2 = sumArr[2];
    operator = sumArr[1];
    return operate(num1, num2, operator);
}

numBtns.forEach((button) => {
    button.addEventListener("click", () => {
        result = 0;
        displayNum += button.id;
        display.textContent = displayNum;
    })
})

opBtns.forEach((button) => {
    button.addEventListener("click", () => {
        if (result != 0){
            displayNum += result;
            result = 0;
        }
        displayNum += ` ${button.id} `;
        display.textContent = displayNum;
    })
})

equalBtn.addEventListener("click", () => {
    result = processSum()
    displayNum = '';
    display.textContent = result;
})