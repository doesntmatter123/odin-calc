'use strict'
const outputField = document.querySelector('.output')
const numberButtons = document.querySelectorAll('.number-btn')
const clearButton = document.querySelector('.clear-btn')
const plusMinusButton = document.querySelector('.plus-minus-btn')
const operatorButtons = document.querySelectorAll('.operator')
const percentageButton = document.querySelector('.percentage-btn')
const dotButton = document.querySelector('.dot')
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
  button.addEventListener('click', (e) => {
    if (outputField.textContent.length >= 11) {
      return
    }
    if (outputField.textContent === '0' || savedNumber ===
      outputField.textContent) {
      outputField.textContent = button.textContent
    } else {
      outputField.textContent += button.textContent
    }
  })

})
// OPERATORS: / * + -
operatorButtons.forEach((button) => button.addEventListener('click', (e) => {
  if (operator) {
    // case where an operation is already in queue
    outputField.textContent = operate(savedNumber, outputField.textContent,
      operator)
  }
  savedNumber = outputField.textContent

  if (button.id === 'equals-btn') {
    operator = ''
    return
  }

  operator = button.id
}))

const operate = (number1, number2, operator) => {
  let result = +operations[operator](number1, number2).toFixed(4)
  if (String(result).length >= 12) { // if the string is too long for the calc
    return result.toExponential(4)
  }
  return result
}
























