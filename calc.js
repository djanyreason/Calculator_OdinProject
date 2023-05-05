let total = 0; // Total in calculator memory
let currentOperator = ""; //Operator to evaluate

let inputRestart = true;
// Boolean which is true if the next input should reset/overwrite the display

// The "display" class div will be important for multiple functions
const displayDiv = document.getElementsByClassName("display")[0];

// Functions for updating the display

// Takes a number parameter; updates the text of the "display" class div to a
// string of the parameter, with a maximum of 1 decimal place and 8 characters
function updateDisplay(newValue) {
  if(typeof(newValue) != "number") return; //ensure parameter is a number
  if(Math.abs(newValue) >= 99999999.5) { // ensure parameter is max 8 digits
    displayDiv.innerText = "ERROR";
    return;
  }

  if(Number.isInteger(newValue)) { // If integer, no transformation necessary
    displayDiv.innerText = newValue.toString();
  } else if (Math.abs(newValue) >= 999999.5) { // If at 7 digits, no decimals
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

// Special updateDisplay for when a decimal point is clicked
// Currently no functionality
function updateDisplayDecimal() {
  return;
}


// Functions for making the operator buttons work

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

// Function that handles onclick for an operator button.
function operatorClick(operator) {
  // If inputRestart is true, that means no new number has been entered yet.
  // In this case, if the operator button is not "=" then it should just update
  // the operator stored in memory.
  if((inputRestart === true) && (operator != "=")) {
    currentOperator = operator;
    return;
  }

  // After operator button, always start fresh on next number press
  inputRestart = true; 
  
  // If no saved operation and the click was not "=", store current value and 
  // the clicked operator, and set for a new number entry
  if((currentOperator === "") && (operator != "=")) {
    total = parseFloat(displayDiv.innerText);
    currentOperator = operator;
    return;
  }

  // Evaluate the stored value and operator with the current display
  const result = operate(total, parseFloat(displayDiv.innerText), currentOperator);
  
  // Update display, then copy the display value into memory: the updateDisplay
  // function truncates to max 1 decimal, so it goes first
  updateDisplay(result);
  if(displayDiv.innerText === "ERROR") { // If an error, clear memory
    total = 0;
    currentOperator = "";
    return;
  } else {
    total = parseFloat(displayDiv.innerText); 
  }

  // If the operator is "=" clear memory for operator, otherwise store operator
  if(operator === "=") {
    currentOperator = "";
  } else {
    currentOperator = operator;
  }
}

//Add onclick to number buttons
const operatorButtons = document.getElementsByClassName("operator");
for(let n = 0; n < operatorButtons.length; n++) {
  operatorButtons[n].onclick = () => operatorClick(operatorButtons[n].innerText);
}


// Functions for making the number buttons work

// Function that handles an onClick event for a number button. Takes one string
// parameter, the number that is clicked. It adds that number to the end of the
// display on the calculator. 
// Does not update if the display cannot be further updated.
function numberClick(num) {
  if(inputRestart) { // If inputRestart is true, clear display
    updateDisplay(0);
    inputRestart = false;
  }

  if(num === '.') {
    updateDisplayDecimal();
    return
  }

  const currNum = parseInt(displayDiv.innerText);

  //Do not update if current entry is not an integer (max decimal places is 1)
  if(currNum != parseFloat(displayDiv.innerText)) return;

  //Do not update if current entry is 8 digits already
  if(currNum > 9999999) return;

  updateDisplay((currNum * 10) + parseInt(num));

}

//Add onclick to number buttons
const numberButtons = document.getElementsByClassName("number");
for(let n = 0; n < numberButtons.length; n++) {
  numberButtons[n].onclick = () => numberClick(numberButtons[n].innerText);
}

