class Calculator {
  constructor(secondaryOutput, mainOutput) {
    this.secondaryOutput = secondaryOutput;
    this.mainOutput = mainOutput;
    this.clear();
  }

  clear() {
    this.mainOp = "";
    this.secondaryOp = "";
    this.operators = undefined;
  }

  delete() {
    this.mainOp = this.mainOp.toString().slice(0, -1);
  }

  appendNumber(num) {
    if (num === "." && this.mainOp.includes(".")) return; // If we type a dot and if we have a dot program will block further dots
    this.mainOp = this.mainOp.toString() + num.toString();
  }

  chooseOperation(op) {
    if (this.mainOp === "") return;
    if (this.secondaryOp !== "") {
      this.compute();
    }
    this.op = op;
    this.secondaryOp = this.mainOp;
    this.mainOp = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.secondaryOp);
    const current = parseFloat(this.mainOp);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.op) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        // Throwing an error when dividing by zero
        if (computation === 0) throw new Error("Cannot divide by zero");
        break;
      default:
        return;
    }
    this.mainOp = computation;
    this.op = undefined;
    this.secondaryOp = "";
  }

 

  updateDisplay() {
    if (this.mainOp === '')
      this.secondaryOutput.textContent = `${this.secondaryOp} ${this.op}`;
    if (this.secondaryOp === '') this.secondaryOutput.textContent = '';
    this.mainOutput.textContent = this.mainOp;
  }
}

const clear = document.querySelector("[data-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const mainOutput = document.querySelector("[data-output-main]");
const secondaryOutput = document.querySelector("[data-output-secondary]");
const numbers = document.querySelectorAll("[data-number]");
const operators = document.querySelectorAll("[data-operators]");
const equal = document.querySelector("[data-equal]");

const calculator = new Calculator(secondaryOutput, mainOutput);

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.textContent);
    calculator.updateDisplay();
  });
});

equal.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clear.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
