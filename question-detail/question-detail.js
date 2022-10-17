//Imports
import '../auth/user.js';

import { getQuestion } from '../fetch-utils.js';

// createComment createAnswer uploadImage getComment getAnswer onComment onAnswer
//renderComment renderAnswer

//DOM Elements
const questionTitle = document.getElementById('question-title');
const questionCategory = document.getElementById('question-category');
const questionContent = document.getElementById('question-content');
const questionCodeSnippet = document.getElementById('question-code-snippet');
const questionScreenshot = document.getElementById('question-screenshot');

const errorDisplay = document.getElementById('error-display');
const answerForm = document.getElementById('answer-form');
const answerImageInput = document.getElementById('answer-image-input');
const answerButton = document.getElementById('answer-button');
const answerList = document.getElementById('answer-list');
const commentForm = document.getElementById('comment-form');
const commentButton = document.getElementById('comment-button');
const commentList = document.getElementById('comment-list');
const preview = document.getElementById('preview');

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
        // displayComments();
        // displayAnswers();
    }

    // onComment(post.id, async (payload) => {
    //     const commentId = payload.new.id;
    //     const commentResponse = await getComment(commentId);
    //     error = commentResponse.error;
    //     if (error) {
    //         alert(error.message);
    //     } else {
    //         const comment = commentResponse.data;
    //         post.comments.unshift(comment);
    //         console.log(post.comments);
    //         displayComments();
    //     }
    // });
});

// commentForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const formData = new FormData(commentForm);
//     const newComment = {
//         comment: formData.get('comment'),
//         question_id: question.id,
//     };

//     const response = await createComment(newComment);
//     error = response.error;
//     if (error) {
//         displayError();
//     } else {
//         commentForm.reset();
//         displayComments();
//     }
// });

// answerForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
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
//         answerForm.reset();
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
}

// function displayComments() {
//     commentList.innerHTML = '';
//     for (const comment of question.comments) {
//         const commentEl = renderComment(comment);
//         commentList.append(commentEl);
//     }
// }

function displayError() {
    errorDisplay.textContent = error.message;
}
