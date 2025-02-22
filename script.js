'use strict';
const formEl = document.querySelector('.form');
const emailEl = document.querySelector('#email');
const countryEl = document.querySelector('#country');
const postalEl = document.querySelector('#postal');
const passwordEl = document.querySelector('#password');
const confirmPasswordEl = document.querySelector('#confirm-password');

emailEl.addEventListener('change', testEmailValidity);
countryEl.addEventListener('change', testCountryValidity);
postalEl.addEventListener('change', testPostalValidity);
passwordEl.addEventListener('change', testPasswordValidity);
confirmPasswordEl.addEventListener('change', testConfirmPasswordValidity);

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const isEmailValid = testEmailValidity();
  const isCountryValid = testCountryValidity();
  const isPostalValid = testPostalValidity();
  const isPasswordValid = testPasswordValidity();
  const isConfirmPasswordValid = testConfirmPasswordValidity();

  if (isEmailValid && isCountryValid && isPostalValid && isPasswordValid && isConfirmPasswordValid) {
    console.log('HIGH FIVE ✋');
  }
});

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

function testPasswordValidity() {
  const inputEl = passwordEl;
  const inputValue = inputEl.value.trim();

  let hasMinLength = inputValue.length >= 8;
  let hasUppercase = /[A-Z]/.test(inputValue);
  let hasLowercase = /[a-z]/.test(inputValue);
  let hasNumber = /\d/.test(inputValue);

  if (inputValue === '') {
    setErrorMessageFor(inputEl, "Password can't be blank.");
    disableConfirmPassword();
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
    confirmPasswordEl.removeAttribute('disabled');
    return true;
  }
}

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

function disableConfirmPassword() {
  confirmPasswordEl.setAttribute('disabled', 'true');
  confirmPasswordEl.classList.remove('error', 'success');
  confirmPasswordEl.value = '';

  const formController = confirmPasswordEl.parentElement;
  const errMessage = formController.querySelector('.inline-error-message');
  if (errMessage) errMessage.innerText = '';
}

function setErrorMessageFor(input, message) {
  const formController = input.parentElement;
  const errMessage = formController.querySelector('.inline-error-message');
  if (errMessage) errMessage.innerText = message;
  formController.className = 'form-control error';
}

function setSuccessFor(input) {
  const formController = input.parentElement;
  const errMessage = formController.querySelector('.inline-error-message');
  if (errMessage) errMessage.innerText = '';
  formController.className = 'form-control success';
}
