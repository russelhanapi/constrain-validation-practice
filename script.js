'use strict';

// Selecting form and input elements
const formEl = document.querySelector('.form');
const emailEl = document.querySelector('#email');
const countryEl = document.querySelector('#country');
const postalEl = document.querySelector('#postal');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

// Adding event listeners to input fields for real-time validation
emailEl.addEventListener('change', testEmailValidity);
countryEl.addEventListener('change', testCountryValidity);
postalEl.addEventListener('change', testPostalValidity);
passwordEl.addEventListener('change', testPasswordValidity);
confirmPasswordEl.addEventListener('change', testConfirmPasswordValidity);

// Handling form submission
formEl.addEventListener('submit', (e) => {
  e.preventDefault(); // Preventing default form submission behavior

  // Validating all input fields before submission
  const isEmailValid = testEmailValidity();
  const isCountryValid = testCountryValidity();
  const isPostalValid = testPostalValidity();
  const isPasswordValid = testPasswordValidity();
  const isConfirmPasswordValid = testConfirmPasswordValidity();

  // If all validations pass, log success message
  if (isEmailValid && isCountryValid && isPostalValid && isPasswordValid && isConfirmPasswordValid) {
    console.log('HIGH FIVE ✋');
  }
});

// Function to validate email
function testEmailValidity() {
  const inputEl = emailEl;
  const inputValue = inputEl.value.trim();
  const regexEmailPattern =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  if (inputValue === '') {
    setErrorMessageFor(inputEl, "Email can't be blank.");
    return false;
  } else if (!regexEmailPattern.test(inputValue)) {
    setErrorMessageFor(inputEl, 'Invalid email address');
    return false;
  } else {
    setSuccessFor(inputEl);
    return true;
  }
}

// Function to validate country selection
function testCountryValidity() {
  const inputEl = countryEl;
  const inputValue = inputEl.value.trim();

  if (inputValue === '') {
    setErrorMessageFor(inputEl, "Country can't be blank.");
    return false;
  } else {
    setSuccessFor(inputEl);
    return true;
  }
}

// Function to validate postal code
function testPostalValidity() {
  const inputEl = postalEl;
  const inputValue = inputEl.value.trim();

  if (inputValue === '') {
    setErrorMessageFor(inputEl, "Postal code can't be blank.");
    return false;
  } else {
    setSuccessFor(inputEl);
    return true;
  }
}

// Function to validate password
function testPasswordValidity() {
  const inputEl = passwordEl;
  const inputValue = inputEl.value.trim();

  // Password requirements
  let hasMinLength = inputValue.length >= 8;
  let hasUppercase = /[A-Z]/.test(inputValue);
  let hasLowercase = /[a-z]/.test(inputValue);
  let hasNumber = /\d/.test(inputValue);

  if (inputValue === '') {
    setErrorMessageFor(inputEl, "Password can't be blank.");
    disableConfirmPassword(); // Disable confirm password field if password is blank
    return false;
  } else if (!hasMinLength) {
    setErrorMessageFor(inputEl, 'Password must be at least 8 characters.');
    disableConfirmPassword();
    return false;
  } else if (!hasUppercase) {
    setErrorMessageFor(inputEl, 'Password must contain at least one uppercase letter.');
    disableConfirmPassword();
    return false;
  } else if (!hasLowercase) {
    setErrorMessageFor(inputEl, 'Password must contain at least one lowercase letter.');
    disableConfirmPassword();
    return false;
  } else if (!hasNumber) {
    setErrorMessageFor(inputEl, 'Password must contain at least one number.');
    disableConfirmPassword();
    return false;
  } else {
    setSuccessFor(inputEl);
    confirmPasswordEl.removeAttribute('disabled'); // Enable confirm password field when valid
    return true;
  }
}

// Function to validate confirm password
function testConfirmPasswordValidity() {
  const inputEl = confirmPasswordEl;
  const inputValue = inputEl.value.trim();

  if (inputValue === '') {
    setErrorMessageFor(inputEl, "Confirm password can't be blank.");
    return false;
  } else if (inputValue !== passwordEl.value) {
    setErrorMessageFor(inputEl, 'Passwords do not match.');
    return false;
  } else {
    setSuccessFor(inputEl);
    return true;
  }
}

// Function to disable the confirm password field when password is invalid
function disableConfirmPassword() {
  confirmPasswordEl.setAttribute('disabled', 'true');
  confirmPasswordEl.classList.remove('error', 'success');
  confirmPasswordEl.value = '';

  // Clear any existing error message
  const formController = confirmPasswordEl.parentElement;
  const errMessage = formController.querySelector('.inline-error-message');
  if (errMessage) errMessage.innerText = '';
}

// Function to set an error message for an input field
function setErrorMessageFor(input, message) {
  const formController = input.parentElement;
  const errMessage = formController.querySelector('.inline-error-message');
  if (errMessage) errMessage.innerText = message;
  formController.className = 'form-control error';
}

// Function to mark an input field as valid
function setSuccessFor(input) {
  const formController = input.parentElement;
  const errMessage = formController.querySelector('.inline-error-message');
  if (errMessage) errMessage.innerText = '';
  formController.className = 'form-control success';
}
