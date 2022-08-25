"use strict";

// DOM elements
const billInput = document.getElementById("inp-bill");
const tipInput = document.getElementById("inp-tip");
const peopleInput = document.querySelector("#inp-people");
const btnPercentage = document.querySelectorAll(".btn");
const errorMsg = document.querySelector(".error-msg");
const errorMsg2 = document.querySelector(".error-msg2");
const tipAmount = document.querySelector(".tip");
const billTotal = document.querySelector(".bill-total");
const reset = document.querySelector(".output-btn");
const calc = document.querySelector(".btn-calc");
const popUp = document.querySelector(".pop-up");
const overlay = document.querySelector(".overlay");
const instructions = document.querySelector(".instructions");
const closeBtn = document.querySelector(".close-btn");

// state variables
let total = 0;
let billValue = 0;
let peopleValue = 0;
let tipValue = 0;

// creating event listeners that call the functions on the input elements
btnPercentage.forEach((btn) => {
  btn.addEventListener("click", percentageClick);
});

// billInputFun means "bill-input Function"
billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
tipInput.addEventListener("input", tipInputFun);

// Enabling clicks on the iput elements that call the colorChange() function
tipInput.addEventListener("click", colorChange);
billInput.addEventListener("click", colorChange);
peopleInput.addEventListener("click", colorChange);

// calculating the tip
function calcTip() {
  if (peopleValue >= 1 && billValue >= 1) {
    let amountTipped = (billValue * tipValue) / peopleValue;
    total = billValue / peopleValue + amountTipped;
    tipAmount.textContent = `$${amountTipped.toFixed(2)}`;
    billTotal.textContent = `$${total.toFixed(2)}`;
  }
}

function percentageClick(event) {
  btnPercentage.forEach((btn) => {
    // removes any active background color on any button
    btn.classList.remove("active1");
    btn.classList.remove("active2");
    if (event.target.textContent === btn.textContent) {
      tipValue = parseFloat(btn.textContent) / 100;
      btn.classList.add("active1");
    }
  });

  calcTip();
}

function billInputFun() {
  billValue = parseFloat(billInput.value);

  calcTip();
}

function tipInputFun() {
  tipValue = parseFloat(tipInput.value) / 100;

  // removes any active background color on any button
  btnPercentage.forEach((btn) => {
    btn.classList.remove("active1");
    btn.classList.remove("active2");
  });
  // error message for custom-input
  if (tipValue <= 0) {
    addError(tipInput, errorMsg2, "be zero");
  } else if (tipValue < 100) {
    removeError(tipInput, errorMsg2);
  } else if (tipValue > 100) {
    addError(tipInput, errorMsg2, "exceed 10k");
  }

  if (tipValue <= 100) {
    calcTip();
  }
}

function peopleInputFun() {
  peopleValue = parseFloat(peopleInput.value);

  // error message for people-input
  if (peopleValue < 1) {
    addError(peopleInput, errorMsg, "be zero");
  } else if (peopleValue < 100) {
    removeError(peopleInput, errorMsg);
  } else if (peopleValue > 100) {
    addError(peopleInput, errorMsg, "exceed 100");
  }

  if (peopleValue <= 100) {
    calcTip();
  }
}

// enabling reset button
reset.addEventListener("click", () => {
  tipAmount.textContent = `$0.00`;
  billTotal.textContent = `$0.00`;
  billInput.value = "";
  peopleInput.value = "";
  tipInput.value = "";
  removeError(peopleInput, errorMsg);
  removeError(tipInput, errorMsg2);
});

// function that adds the errors (error-function)
function addError(input, msg, max) {
  msg.textContent = `Can't ${max}`;
  msg.classList.add("active");
  input.classList.add("active");
}

// function that removes the errors
function removeError(input, msg) {
  msg.classList.remove("active");
  input.classList.remove("active");
}

// functionality of pop-up displaying the instructions and overlay control
popUp.addEventListener("click", () => {
  instructions.classList.add("active");
  overlay.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  instructions.classList.remove("active");
  overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
  instructions.classList.remove("active");
  overlay.classList.remove("active");
});

// function enabling color change of buttons
function colorChange() {
  btnPercentage.forEach((btn) => {
    btn.classList.remove("active2");
    if (btn.classList.contains("active1")) {
      btn.classList.add("active2");
    }
  });
}
