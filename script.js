const display = document.querySelector("#display");
let displayNum = '';
const numBtns = document.querySelectorAll(".number");
const opBtns = document.querySelectorAll(".operator");
const equalBtn = document.querySelector("#equals");
const clearBtn = document.querySelector("#AC");


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
result: ${result}
Number(displayNum): ${Number(displayNum)}`);
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
            processSum(Number(displayNum));
            operator = button.id;
        }

        if (display.textContent == result) {
            console.log("result used for num1")
            num1 = result;
        } else if (!num1) {
            num1 = Number(displayNum);
            result = 0;
        } else if (!num2) {
            processSum(Number(displayNum));
        }
        displayNum = '';
        logVariables()
    })
});

equalBtn.addEventListener("click", () => {
    processSum(Number(displayNum));
    logVariables()
})

clearBtn.addEventListener("click", () => {
    clearVars()
    display.textContent = '';
    logVariables()
})