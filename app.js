/* Imports */
import { getQuestions } from './fetch-utils.js';
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderQuestion } from './render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const questionsList = document.getElementById('questions-list');

/* State */
let error = null;
let questions = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getQuestions();
    error = response.error;
    questions = response.data;

    if (error) {
        displayError();
    } else {
        displayQuestions();
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        //eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayQuestions() {
    questionsList.innerHTML = '';

    for (const question of questions) {
        const questionEl = renderQuestion(question);
        questionsList.append(questionEl);
    }
}
