//Imports
import '../auth/user.js';

import {
    getQuestion,
    createComment,
    onComment,
    getComment,
    getQuestionCreator,
} from '../fetch-utils.js';
import { renderComment, renderQuestionCreator } from '../render-utils.js';
import { signOutUser } from '../fetch-utils.js';

//DOM Elements
const questionTitle = document.getElementById('question-title');
const questionCategory = document.getElementById('question-category');
const questionCreatorDetail = document.getElementById('category-and-user-info');
const questionContent = document.getElementById('question-content');
const questionCodeSnippet = document.getElementById('question-code-snippet');
const questionScreenshot = document.getElementById('question-screenshot');
const screenshot = document.getElementById('screenshot');
const screenshotCaption = document.getElementById('screenshot-caption');
const errorDisplay = document.getElementById('error-display');
// const answerForm = document.getElementById('answer-form');
// const answerImageInput = document.getElementById('answer-image-input');
// const answerButton = document.getElementById('answer-button');
// const answerList = document.getElementById('answer-list');
// const preview = document.getElementById('preview');
const commentForm = document.getElementById('comment-form');
const commentButton = document.getElementById('comment-button');
const commentList = document.getElementById('comment-list');
const navSignout = document.getElementById('nav-signout');

//State
let error = null;
let question = null;
let profile = null;

//Events

navSignout.addEventListener('click', () => {
    signOutUser();
});

window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (!id) {
        location.assign('/');
        return;
    }
    const response = await getQuestion(id);
    const creatorProfile = await getQuestionCreator(id);
    error = response.error;

    if (error) {
        displayError();
    } else {
        question = response.data;
        profile = creatorProfile.data;
    }
    if (!question) {
        location.assign('/');
    } else {
        displayQuestion();
        displayComments();
        // displayAnswers();
    }

    onComment(question.id, async (payload) => {
        const commentId = payload.new.id;
        const commentResponse = await getComment(commentId);
        error = commentResponse.error;
        if (error) {
            alert(error.message);
        } else {
            const comment = commentResponse.data;
            question.comments.unshift(comment);
            displayComments();
        }
    });
});

// make comment for change to push up
// and anotha one

commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    commentButton.disabled = true;

    const formData = new FormData(commentForm);
    const newComment = {
        question_id: question.id,
        comment: formData.get('comment-input'),
    };

    const response = await createComment(newComment);
    error = response.error;

    if (error) {
        displayError();
    } else {
        commentForm.reset();
        commentButton.disabled = false;
        displayComments();
    }
});

// answerForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     answerButton.disabled = true;

//     const formData = new FormData(answerForm);
//     const newAnswer = {
//         answer: formData.get('answer'),
//         question_id: question.id,
//     };

//     const response = await createAnswer(newAnswer);
//     error = response.error;
//     if (error) {
//         displayError();
//     } else {
//         question.answers.unshift(answer);
//         answerForm.reset();
//         answerButton.disabled = false;
//         displayAnswers();
//     }
// });

//Display Functions
function displayQuestion() {
    questionTitle.textContent = question.title;
    questionCategory.textContent = question.category;
    questionContent.textContent = question.content;
    questionCodeSnippet.textContent = question.code_text;

    const questionCreator = renderQuestionCreator(profile);
    questionCreatorDetail.append(questionCreator);
    if (question.screenshot_url.length <= 103) {
        document.getElementById('screenshot').style.pointerEvents = 'none';
        document.getElementById('screenshot').style.cursor = 'default';
        screenshotCaption.textContent = 'no code screenshot provided';
        questionScreenshot.src = '/assets/download.png';
    } else {
        questionScreenshot.src = question.screenshot_url;
        questionScreenshot.alt = `${question.title} image`;
        screenshotCaption.textContent = '*click on screenshot to enlarge*';
    }

    screenshot.href = question.screenshot_url;
}

function displayComments() {
    commentList.innerHTML = '';
    for (const comment of question.comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}

// function displayAnswers() {
//     answerList.innerHTML = '';
//     for (const answer of question.answers);
//     const answerEl = renderAnswer(answer);
//     answerList.append(answerEl);
// }

function displayError() {
    errorDisplay.textContent = error.message;
}
