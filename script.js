// This is an OOP solution, but you could append button.innerText to an
// empty string and use eval().

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  selectOperation(operation) {
    if (this.currentOperand === "") return
    if (this.previousOperand !== "") {
      this.calculate()
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  calculate() {
    let calculation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case "÷":
        calculation = prev / current;
        break;
      case "×":
        calculation = prev * current;
        break;
      case "-":
        calculation = prev - current;
        break;
      case "+":
        calculation = prev + current;
        break;
      default:
        return;
    }
    this.currentOperand = calculation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  invert() {
    if (this.currentOperand < 0) return
    const invertedNumber = `-${this.currentOperand.toString()}`
    this.currentOperand = invertedNumber;

  }

  getDisplayContent(number) {
    const stringifiedNumber = number.toString();
    const integerDigits = parseFloat(stringifiedNumber.split(".")[0]);
    const decimalDigits = stringifiedNumber.split(".")[1]
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayContent(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayContent(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-calculate]');
const invertBtn = document.querySelector('[data-invert]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-clear]');
const previousOperandTextElement = document.querySelector('[data-prev-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationBtns.forEach(button => {
  button.addEventListener("click", () => {
    calculator.selectOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsBtn.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
})

invertBtn.addEventListener("click", () => {
  calculator.invert();
  calculator.updateDisplay();
})

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
})

allClearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();

})