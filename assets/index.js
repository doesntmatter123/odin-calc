'use strict'
const MAX_RESULT_LENGTH = 12
const outputField = document.querySelector('.output')
const numberButtons = document.querySelectorAll('.number-btn')
const clearButton = document.querySelector('.clear-btn')
const plusMinusButton = document.querySelector('.plus-minus-btn')
const operatorButtons = document.querySelectorAll('.operator')
const percentageButton = document.querySelector('.percentage-btn')
const dotButton = document.querySelector('.dot')

const handleNumberClick = (e) => {
  if (outputField.textContent.length >= MAX_RESULT_LENGTH) {
    return
  }
  if (outputField.textContent === '0' || savedNumber ===
    outputField.textContent) {
    outputField.textContent = e.target.textContent
  } else {
    outputField.textContent += e.target.textContent
  }
}

const handleOperatorClick = (e) => {
  if (operator) {
    // case where an operation is already in queue
    outputField.textContent = operate(savedNumber, outputField.textContent,
      operator)
  }
  savedNumber = outputField.textContent

  if (e.target.id === 'equals-btn') {
    operator = ''
    return
  }

  operator = e.target.id
  console.log(operator)
}


outputField.textContent = '0'
let savedNumber = ''
let operator = ''
const operations = {
  add (n1, n2) {
    return +n1 + +n2
  },

  subtract (n1, n2) {
    return n1 - n2
  },

  divide (numerator, denominator) {
    if (denominator === '0') {
      const mainContainer = document.querySelector('.main-container')
      setTimeout(() => {
        mainContainer.style.animationName = ''
      }, 1000)
      mainContainer.style.animationName = 'shift'
      return numerator
    } else {
      return numerator / denominator
    }
  },

  multiply (n1, n2) {
    return n1 * n2
  },

}
//-------- LISTENERS --------
// AC
clearButton.addEventListener('click', () => {
  outputField.textContent = '0'
  operator = ''
  savedNumber = ''
})
// .
dotButton.addEventListener('click', () => {
  outputField.textContent += '.'
})
// +-
plusMinusButton.addEventListener('click', () => {
  outputField.textContent = (-outputField.textContent).toString()
})
// %
percentageButton.addEventListener('click', () => {
  let base = savedNumber
  let percent = outputField.textContent
  let result
  if (operator){
    result = operate(base, (percent / 100) * base, operator)
  } else {
    result = percent / 100
  }
  operator = ''
  outputField.textContent = result
})
// NUMBERS
numberButtons.forEach((button) => {
  button.addEventListener('click', handleNumberClick)
})
// OPERATORS: / * + -
operatorButtons.forEach(
  (button) => button.addEventListener('click', handleOperatorClick))

const operate = (number1, number2, operator) => {
  let result = +operations[operator](number1, number2).toFixed(4)
  if (String(result).length >= MAX_RESULT_LENGTH) { // if the string is too long for the calc
    return result.toExponential(4)
  }
  return result
}























