const display = document.querySelector("#display");
let displayNum = '';
const numBtns = document.querySelectorAll(".number");
const opBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector("#equals");
const clearBtn = document.querySelector("#AC");


const add = (a, b) => a+b;
const subtract = (a, b) =>  a-b;
const multiply = (a, b) => a*b;
const divide = (a, b) => a/b ;

let num1 = null;
let num2 = null;
let operator = null;
let result = 0;

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
result: ${result}`);
}

function clearVars(){
    num1 = null;
    num2 = null;
    operator = null;
    displayNum = '';
    opBtns.forEach(button => button.classList.remove("currentOp"));

}

function processSum(num2){
    result = operate(num1, num2, operator)
    if (result.toString().length > 10){
        result = "Err. too big!"
    }
    display.textContent = result
    clearVars();
}

numBtns.forEach((button) => {
    button.addEventListener("click", () => {
        displayNum += button.id;
        value = Number(displayNum);
        display.textContent = displayNum;
        logVariables()
    })
})

opBtns.forEach((button) => {
    button.addEventListener("click", () => {
        opBtns.forEach(button => button.classList.remove("currentOp"));
        button.classList.add("currentOp");

        if (!operator){
            operator = button.id;
        } else {
            processSum(value);
            operator = button.id;
        }

        if (display.textContent == result) {
            console.log("num1 = result")
            num1 = result;
        } else if (!num1) {
            num1 = value;
        } else if (!num2) {
            processSum(value);
        }
        displayNum = '';
        logVariables()
    })
});

equalBtn.addEventListener("click", () => {
    processSum(value);
    logVariables()
})

clearBtn.addEventListener("click", () => {
    clearVars()
    display.textContent = '';
    logVariables()
})