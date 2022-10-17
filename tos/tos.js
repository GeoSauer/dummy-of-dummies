// imports
import '../auth/user.js';

// const user = getUser();

// Dom elements
const errorDisplay = document.getElementById('error-display');
const tosButton = document.getElementById('tos-button');

// State
let error = null;

//Event listerner
tosButton.addEventListener('click', () => {
    location.assign('../');

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
