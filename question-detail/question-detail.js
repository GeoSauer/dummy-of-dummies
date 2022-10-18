//Imports
import '../auth/user.js';

import { getQuestion, createComment, onComment, getComment } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';
// createComment createAnswer uploadImage getComment getAnswer onComment onAnswer
//renderComment renderAnswer

//DOM Elements
const questionTitle = document.getElementById('question-title');
const questionCategory = document.getElementById('question-category');
const questionContent = document.getElementById('question-content');
const questionCodeSnippet = document.getElementById('question-code-snippet');
const questionScreenshot = document.getElementById('question-screenshot');

const errorDisplay = document.getElementById('error-display');
// const answerForm = document.getElementById('answer-form');
// const answerImageInput = document.getElementById('answer-image-input');
// const answerButton = document.getElementById('answer-button');
// const answerList = document.getElementById('answer-list');
// const preview = document.getElementById('preview');
const commentForm = document.getElementById('comment-form');
const commentButton = document.getElementById('comment-button');
const commentList = document.getElementById('comment-list');

//State
let error = null;
let question = null;

//Events
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    if (!id) {
        location.assign('/');
        return;
    }
    const response = await getQuestion(id);
    error = response.error;

    if (error) {
        displayError();
    } else {
        question = response.data;
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
    const comment = response.data;

    if (error) {
        displayError();
    } else {
        question.comments.unshift(comment);
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
    questionScreenshot.src = question.screenshot_url;
    questionScreenshot.alt = `${question.title} image`;
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
