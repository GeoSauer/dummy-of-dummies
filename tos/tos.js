// imports
import '../auth/user.js';

// const user = getUser();

// Dom elements
const errorDisplay = document.getElementById('error-display');
const tosButton = document.getElementById('tos-button');
const tosCheckbox = document.getElementById('agree-tos-check');

// State
let error = null;

//Event listener

tosButton.addEventListener('click', () => {
    if (tosCheckbox.checked) {
        location.assign('/');
    } else {
        alert('You must agree to ToS to continue');
    }

    if (error) {
        displayError();
    }
});

//display functions
function displayError() {
    errorDisplay.textContent = error.message;
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
