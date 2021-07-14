let prevOperandEl = document.querySelector(".prev__operand")
let currOperandEl = document.querySelector(".curr__operand")
const operationSign = document.querySelector(".operation__sign")
const calculatorScreen = document.querySelector(".result")
const digitBtns = document.querySelectorAll(".keypad__key-digit")
const operationBtns = document.querySelectorAll(".keypad__key-operation")
const delBtn = document.querySelector(".keypad__key-del")
const resetBtn = document.querySelector(".keypad__key-reset")
const equalBtn = document.querySelector(".keypad__key-equal")
const decimalBtn = document.querySelector(".keypad__key-decimal")

class Calculator {
  constructor(prevOperand, currOperand) {
    this.prevOperand = prevOperand
    this.currOperand = currOperand
    this.operation = ""
  }

  display(digit) {
    if (this.currOperand.length > 12) return 
    this.currOperand += digit
    this.update()
  }

  delete() {
    this.currOperand = ""
    this.prevOperand = ""
    this.update()
  }

  selectOperation(operation) {

    if (this.currOperand == "") return
  
    if (this.prevOperand !== "") {
      this.compute()
    }

    this.operation = operation
    this.prevOperand = this.currOperand
    this.currOperand = ""

    this.update()
  }

  compute() {
    switch(this.operation) {
      case "+":
        this.currOperand = parseFloat(this.prevOperand) + parseFloat(this.currOperand)
        break
      case "-":
        this.currOperand = parseFloat(this.prevOperand) - parseFloat(this.currOperand)
        break
      case "/":
        this.currOperand = parseFloat(this.prevOperand) / parseFloat(this.currOperand)
        break
      case "x":
        this.currOperand = parseFloat(this.prevOperand) * parseFloat(this.currOperand)
        break
      default:
        return
    }
  }

  addDecimal() {
    if (this.currOperand.includes(".")) return

    this.currOperand += "."
    this.update()
  }

  total() {
    this.compute()
    this.prevOperand = ""
    this.operation = ""
    this.update()
  }

  reset() {
    this.currOperand = "0"
    this.prevOperand = ""
    this.update()
  }

  update() {
    currOperandEl.textContent = this.currOperand ? parseFloat(this.currOperand).toLocaleString() : ""
    prevOperandEl.textContent = this.prevOperand ? parseFloat(this.prevOperand).toLocaleString() : ""
    operationSign.textContent = this.operation ? this.operation : ""
  }
}

const calculator = new Calculator(prevOperandEl.innerText, currOperandEl.innerText)

digitBtns.forEach(digitBtn => digitBtn.addEventListener("click", getDigit))
operationBtns.forEach(operationBtn => operationBtn.addEventListener("click", getOperation))

delBtn.addEventListener("click", () => calculator.delete())
resetBtn.addEventListener("click", () => calculator.reset())
equalBtn.addEventListener("click", () => calculator.total())
decimalBtn.addEventListener("click", () => calculator.addDecimal())

function getOperation(e) {
  const operationText = e.target.innerText
  calculator.selectOperation(operationText)
}

function getDigit(e) {
  calculator.display(e.target.innerText)
}

