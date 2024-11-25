const add = (a, b) => a+b;

const subtract = (a, b) =>  a-b;

const multiply = (a, b) => a*b;

const divide = (a, b) => a/b ;

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