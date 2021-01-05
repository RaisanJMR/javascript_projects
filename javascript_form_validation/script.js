// ***********************************
//         !--PULLING DOM ELEMENTS--!
// ***********************************

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// ***********************************
//         !--SHOW INPUT ERROR MESSAGE--!
// ***********************************

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = document.querySelector("small");
  small.innerText = message;
}

// ***********************************
//         !--SHOW SUCCESS MESSAGE--!
// ***********************************

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

// ***********************************
//         !--EMAIL VALIDATION--!
// ***********************************

function isValidEmail(email) {

}

// ***********************************
//         !--EVENT LISTENERS--!
// ***********************************
// adding an event listener when submiting the form

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (username.value === "") {
    showError(username, "Username is required");
  } else {
    showSuccess(username);
  }
  if (email.value === "") {
    showError(email, "Email is required");
  } else {
    showSuccess(email);
  }
  if (password.value === "") {
    showError(password, "Password is required");
  } else {
    showSuccess(password);
  }
  if (password2.value === "") {
    showError(password2, "Password is required");
  } else {
    showSuccess(password2);
  }
});
