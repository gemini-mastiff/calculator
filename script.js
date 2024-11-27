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
        return 5318008;
    } else {
        return a/b;
    }
};

let num1 = null;
let num2 = null;
let operator = null;
let result = '';

function operate(a, b, operation) {
    return operation === "+" ? add(a, b)
    : operation === "-" ? subtract(a, b)
    : operation === "*" ? multiply(a, b)
    : operation === "/" ? divide(a, b)
    : "Err.";
};

function clearVars(){
    num1 = null;
    num2 = null;
    operator = null;
    displayNum = '';
}

function processSum() {
    result = operate(num1, num2, operator)
    result = Number(result.toFixed(2)) //rounds to 2 d.p. and converts to int
    if (result.toString().length > 10){
        //display can only hold up to 10 numbers
        result = "Err. too big!";
    }
    display.textContent = result;
    clearVars(); //refreshes the calc to begin again
}

function updateDisplay() {
    if (displayNum > 10) {
        //display can only hold 10 characters before it overflows
        displayNum = displayNum.substring(0,10);
    } 
    display.textContent = displayNum;
    if (displayNum === ''){
        //there will always be a number showing, even if it is just 0
        display.textContent = '0';
    };
}

function checkEdgeCases(button) {
    if (display.textContent === '0' && button.id === '0'){
        //prevents multiple 0s from being typed without another number
        displayNum = '';
    } else if (display.textContent === '0' && button.id === '.'){
        displayNum = '0.';
    } else if (button.id === '.' && displayNum.includes('.')){
        //quick fix to only allow one decimal point in the str
        displayNum = displayNum.replace('.', '[TEMP]').replace(/[.]/g, '').replace('[TEMP]', '.');
    }
}

function useDisplay() {
    //in cases where the result needs to be manipulated as a str
    if (displayNum === ''){
        displayNum = display.textContent;
    }
}

//----- BUTTON EVENT LISTENERS -----

numBtns.forEach((button) => {
    button.addEventListener("click", () => {
        displayNum += button.id;
        checkEdgeCases(button);
        updateDisplay();
    });
});

opBtns.forEach((button) => {
    button.addEventListener("click", () => {
        if (!num1){
            num1 = Number(display.textContent);
            //stores displayNum in num1 as an int, then refreshes displayNum
            displayNum = '';
            operator = button.id;
        } else if (num1 && operator){
            num2 = Number(display.textContent);
            processSum()
            //this is when input is num > operator > num > operator etc.
            //num1 automatically becomes result
            num1 = Number(display.textContent);
            //operator only changes after previous operation is complete
            operator = button.id;
        }
    });
});

equalBtn.addEventListener("click", () => {
    if (num1 && operator){
        num2 = Number(display.textContent);
        processSum()
    } else {
        console.log("No second argument");
    };
});

clearBtn.addEventListener("click", () => {
    clearVars();
    updateDisplay();
});

delBtn.addEventListener("click", () => {
    displayNum = displayNum.slice(0, -1);
    updateDisplay();
});

posNegBtn.addEventListener("click", () => {
    useDisplay();
    if (displayNum.includes('-')){
        displayNum = displayNum.substring(1);
        updateDisplay();
    } else {
        displayNum = `-${displayNum}`;
        updateDisplay();
    };
});

percentBtn.addEventListener("click", () => {
    useDisplay();
    displayNum = (displayNum/100).toString(); //kept as string so it can  continue to be manipulated properly
    updateDisplay();
});