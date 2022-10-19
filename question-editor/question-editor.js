/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { createQuestion, uploadImage } from '../fetch-utils.js';

/* Get DOM Elements */
const questionForm = document.getElementById('question-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');

/* State */
let error = null;

/* Events */

questionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(questionForm);

    const imageFile = formData.get('image-input');
    const randomFolder = Math.floor(Math.random() * Date.now());
    const imagePath = `question-images/${randomFolder}/${imageFile.name}`;
    const url = await uploadImage('images', imagePath, imageFile);

    const question = {
        title: formData.get('question-title'),
        category: formData.get('category-select'),
        content: formData.get('question-text-area'),
        code_text: formData.get('code-text-area'),
        screenshot_url: url,
    };

    const response = await createQuestion(question);

    error = response.error;

    if (error) {
        displayError();
    } else {
        location.replace('/');
    }
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        imagePreview.src = URL.createObjectURL(file);
    } else {
        imagePreview.src = '/assets/download.png';
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
