let firstOperand = 0;
let secondOperand = 0;
let currentOperator = "";

// The "display" class div will be important for multiple functions
const displayDiv = document.getElementsByClassName("display")[0];

// Returns sum of 2 parameters
function add(operand1, operand2) {
  return operand1 + operand2;
}

// Returns first parameter minus second parameter
function subtract(operand1, operand2) {
  return operand1 - operand2;
}

// Returns product of 2 parameters
function multiply(operand1, operand2) {
  return operand1 * operand2;
}

// Returns first parameter divided by second parameter
function divide(operand1, operand2) {
  return operand1 / operand2;
}

// Takes three parameters: first two are numbers, third is a string of a basic 
// mathematical operator (+, -, *, /); returns a number that is the operator
// applied to the two numbers in order
function operate(operand1, operand2, operator) {
  switch(operator) {
    case "+":
      return add(operand1, operand2);
    case "-":
      return subtract(operand1, operand2);
    case "*":
      return multiply(operand1, operand2);
    case "/":
      return divide(operand1, operand2);
  }
}

// Takes a number parameter; updates the text of the "display" class div to a
// string of the parameter, with a maximum of 1 decimal place and 8 characters
function updateDisplay(newValue) {
  if(typeof(newValue) != "number") return; //ensure parameter is a number
  if(Math.abs(newValue) >= 99999999.5) { // ensure parameter is max 8 digits
    displayDiv.innerText = "ERROR";
    return;
  }

  if(Number.isInteger(newValue)) { // If an integer, no transformation necessary
    displayDiv.innerText = newValue.toString();
  } else if (Math.abs(newValue) >= 999999.5) { // If at least 7 digits, no decimals
    displayDiv.innerText = Math.round(newValue).toString();
  } else { // Short non-integer, need to ensure 1 decimal place
    const decimalPlace = Math.abs(Math.round(newValue * 10) % 10);
    if(decimalPlace === 0) { // If decimal is 0, do not display
      displayDiv.innerText = Math.round(newValue).toString();
    } else { // Add the decimal
      if(newValue > 0) { //round down for positives
        displayDiv.innerText = Math.floor(newValue).toString()
                               + '.' + decimalPlace;
      } else { //round up for negatives
        displayDiv.innerText = Math.ceil(newValue).toString()
                               + '.' + decimalPlace;
      }
    }
  }
}