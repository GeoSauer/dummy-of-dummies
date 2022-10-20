/* Imports */
import {
    getQuestions,
    addFavoriteQuestion,
    onFavoriteQuestion,
    removeFavoriteQuestion,
    getUser,
    getCategories,
} from './fetch-utils.js';
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderQuestion, renderCategoryOption } from './render-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const questionsList = document.getElementById('questions-list');
const searchForm = document.getElementById('search-form');
const notificationDisplay = document.getElementById('notification-display');
const categorySelect = document.getElementById('category-select');

/* State */
const user = getUser();
let error = null;
let questions = [];
let categories = [];
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

    const response = await getCategories();
    error = response.error;
    categories = response.data;

    if (error) {
        displayError();
    } else {
        displayCategoryOptions();
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

async function findPost(name, category) {
    const response = await getQuestions(name, category);
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
    findPost(formData.get('name'), formData.get('category'));
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

function displayCategoryOptions() {
    const uniqueCategories = [...new Set(categories.map((question) => question.category))];
    for (const category of uniqueCategories) {
        const option = renderCategoryOption(category);
        categorySelect.append(option);
    }
}
