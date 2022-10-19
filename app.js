/* Imports */
import {
    getQuestions,
    addFavoriteQuestion,
    onFavoriteQuestion,
    removeFavoriteQuestion,
    getUser,
    signOutUser,
    updateProfile,
} from './fetch-utils.js';

// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderQuestion } from './render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const questionsList = document.getElementById('questions-list');
const searchForm = document.getElementById('search-form');
const notificationDisplay = document.getElementById('notification-display');
const navSignout = document.getElementById('nav-signout');
const navPe = document.getElementById('nav-pe');

/* State */
const user = getUser();
let error = null;
let questions = [];
let count = 0;

/* Events */
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

    onFavoriteQuestion(handleFavorite, handleUnfavorite);
});

function handleFavorite(payload) {
    for (const question of questions) {
        if (question.id === payload.new.question_id) {
            question.favorites.push(payload.new);
            displayQuestions();
            break;
        }
    }
}

function handleUnfavorite(payload) {
    for (const question of questions) {
        if (question.id !== payload.old.question_id) {
            continue;
        }

        for (let i = 0; i < question.favorites.length; i++) {
            if (question.favorites[i].user_id === payload.old.user_id) {
                question.favorites.splice(i, 1);
                displayQuestions();
                break;
            }
        }
    }
}

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

navSignout.addEventListener('click', () => {
    signOutUser();
});

navPe.addEventListener('click', () => {
    updateProfile();
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
        const questionEl = renderQuestion(question, user.id);
        questionsList.append(questionEl);

        const favoriteButton = questionEl.querySelector('.favorite-button');

        favoriteButton.addEventListener('click', async () => {
            favoriteButton.disabled = true;
            if (favoriteButton.classList.contains('favorited')) {
                const response = await removeFavoriteQuestion(question.id, user.id);
                error = response.error;
                if (error) {
                    displayError();
                }
            } else {
                const response = await addFavoriteQuestion(question.id, user.id);
                error = response.error;
                if (error) {
                    displayError();
                }
            }
            favoriteButton.disabled = false;
        });
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
