
let current = "0";
let firstNumber = null;
let operator = null;
let startNew = false;

const screen = document.getElementById("screen");
const preview = document.getElementById("preview");

function updateScreen() {
    screen.value = current;
}

function addNumber(number) {
    if (startNew) {
        current = number === "." ? "0." : number;
        startNew = false;
    } else if (number === ".") {
        if (!current.includes(".")) {
            current += ".";
        }
    } else {
        current = current === "0" ? number : current + number;
    }

    updateScreen();
    showPreview();
}

function chooseOperator(op) {
    firstNumber = Number(current);
    operator = op;
    startNew = true;
    preview.textContent = current + " " + op;
}

function calculate() {
    if (operator === null) return;

    let secondNumber = Number(current);
    let result;

    if (operator === "+") {
        result = firstNumber + secondNumber;
    } else if (operator === "-") {
        result = firstNumber - secondNumber;
    } else if (operator === "*") {
        result = firstNumber * secondNumber;
    } else if (operator === "/") {
        if (secondNumber === 0) {
            current = "Error";
            preview.textContent = "Cannot divide by zero";
            updateScreen();
            operator = null;
            startNew = true;
            return;
        }
        result = firstNumber / secondNumber;
    }

    current = String(Number(result.toPrecision(10)));
    preview.textContent = firstNumber + " " + operator + " " +
        secondNumber + " =";
    operator = null;
    startNew = true;
    updateScreen();
}

function showPreview() {
    if (operator === null || startNew) return;

    let secondNumber = Number(current);
    let result;

    if (operator === "+") result = firstNumber + secondNumber;
    if (operator === "-") result = firstNumber - secondNumber;
    if (operator === "*") result = firstNumber * secondNumber;
    if (operator === "/" && secondNumber !== 0) {
        result = firstNumber / secondNumber;
    }

    if (result !== undefined && Number.isFinite(result)) {
        preview.textContent = "Live result: " +
            Number(result.toPrecision(10));
    }
}

function clearScreen() {
    current = "0";
    firstNumber = null;
    operator = null;
    startNew = false;
    preview.textContent = "Let's calculate!";
    updateScreen();
}

function backspace() {
    if (startNew || current === "Error") {
        current = "0";
        startNew = false;
    } else {
        current = current.length > 1 ? current.slice(0, -1) : "0";
    }

    updateScreen();
    showPreview();
}

document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (key >= "0" && key <= "9" || key === ".") {
        addNumber(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "Escape" || key === "Delete") {
        clearScreen();
    }
});
