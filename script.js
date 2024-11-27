const display = document.querySelector("#display");
let displayNum = '';
const numBtns = document.querySelectorAll(".number");
const opBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector("#equals");
const clearBtn = document.querySelector("#AC");
const delBtn = document.querySelector("#DEL");
const posNegBtn = document.querySelector("#pos-neg");
const percentBtn = document.querySelector("#percent");


const add = (a, b) => a+b;
const subtract = (a, b) =>  a-b;
const multiply = (a, b) => a*b;
const divide = (a, b) => {
    if (b === 0){
        return "Nice try."
    } else {
        return a/b;
    }
};

let num1 = null;
let num2 = null;
let operator = null;
let result = null;

function operate(a, b, operation){
    return operation === "+" ? add(a, b)
    : operation === "-" ? subtract(a, b)
    : operation === "*" ? multiply(a, b)
    : operation === "/" ? divide(a, b)
    : "Err.";
};

function logVariables(){
    console.log(
`num1: ${num1}
operator: ${operator}
num2: ${num2}
result: ${result}
Number(displayNum): ${Number(displayNum)}`);
}

function clearVars(){
    num1 = null;
    num2 = null;
    operator = null;
    displayNum = '';
}

function processSum(){
    result = operate(num1, num2, operator)
    result = Number(result.toFixed(2)) //rounds to 2 d.p. and converts to int
    if (result.toString().length > 10){
        result = "Err. too big!"
    }
    display.textContent = result;
    clearVars();
}

numBtns.forEach((button) => {
    button.addEventListener("click", () => {
        displayNum += button.id;
        if (button.id === '.' && displayNum.includes('.')){
            displayNum = displayNum.replace('.', '[TEMP]').replace(/[.]/g, '').replace('[TEMP]', '.');
        }
        if (displayNum > 10) displayNum = displayNum.substring(0,10);
        display.textContent = displayNum;
        logVariables()
    })
})

opBtns.forEach((button) => {
    button.addEventListener("click", () => {
        
        if (!num1){
            num1 = Number(display.textContent);
            displayNum = '';
        } else if (num1 && operator){
            num2 = Number(display.textContent);
            processSum()
            num1 = Number(display.textContent);
            operator = button.id;
        }

        operator = button.id

        logVariables()
    })
});

equalBtn.addEventListener("click", () => {
    if (num1 && operator){
        num2 = Number(display.textContent);
        processSum()
    } else {
        console.log("ERROR");
    }
    logVariables()

})

clearBtn.addEventListener("click", () => {
    clearVars();
    display.textContent = '0';
    logVariables();
})

delBtn.addEventListener("click", () => {
    displayNum = displayNum.slice(0, -1);
    display.textContent = displayNum;
    if (displayNum === ''){
        display.textContent = '0';
    }
});