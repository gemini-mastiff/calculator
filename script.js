function add(a, b){
    return a+b;
};

function subtract(a, b){
    return a-b;
};

function multiply(a, b){
    return a*b;
};

function divide(a, b){
    return a/b;
};

let firstNum;
let secondNum;
let operator;

function operate(firstNum, secondNum, operator){
    return operator === "+" ? add(firstNum, secondNum)
    : operator === "-" ? subtract(firstNum, secondNum)
    : operator === "*" ? multiply(firstNum, secondNum)
    : operator === "/" ? divide(firstNum, secondNum)
    : "Please enter a valid operator (+, -, *, /)";
};