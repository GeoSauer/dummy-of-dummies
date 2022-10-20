/* Imports */
import { getQuestions } from './fetch-utils.js';
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderQuestion } from './render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const questionsList = document.getElementById('questions-list');
const searchForm = document.getElementById('search-form');
const notificationDisplay = document.getElementById('notification-display');
// const menuToggleButton = document.querySelector('.nav-toggle');
// const navMenu = document.querySelector('.nav');

/* State */
let error = null;
let questions = [];
let count = 0;

/* Events */
// menuToggleButton.addEventListener('click', () => {
//     console.log('click');
//     if (navMenu.className === 'open') {
//         navMenu.classList.add('hide');
//         navMenu.classList.remove('open');
//     } else if (navMenu.className === 'hide') {
//         navMenu.classList.add('open');
//         navMenu.classList.remove('hide');
//     }
// });

window.addEventListener('load', async () => {
    findPost();

    const response = await getQuestions();
    error = response.error;
    questions = response.data;

    if (error) {
        displayError();
    } else {
        displayQuestions();
    }
});

async function findPost(name) {
    const response = await getQuestions(name);

    error = response.error;
    questions = response.data;
    count = response.count;

    displayNotifications();
    if (error) {
        displayError();
    } else {
        displayQuestions();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    findPost(formData.get('name'));
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

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
        notificationDisplay.textContent = `Showing ${questions.length} of ${count}`;
    }
}
