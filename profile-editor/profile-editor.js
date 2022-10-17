//Imports
import '../auth/user.js';
import { updateProfile, getProfile, getUser, uploadImage } from '../fetch-utils.js';

const user = getUser();
//DOM elements
const profileForm = document.getElementById('profile-form');
const updateProfileButton = document.getElementById('update-profile-button');
const usernameInput = document.getElementById('username-input');
const bioInput = document.getElementById('bio-input');
const avatarInput = document.getElementById('avatar-input');
const preview = document.getElementById('preview');
const errorDisplay = document.getElementById('error-display');

//State
let profile = null;
let error = null;

//Events
window.addEventListener('load', async () => {
    const response = await getProfile(user.id);

    profile = response.data;
    error = response.error;

    if (error) {
        displayError();
    }
    if (profile) {
        displayProfile();
    }
});

avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];
    preview.src = URL.createObjectURL(file);
});

profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorDisplay.textContent = '';
    updateProfileButton.disabled = true;

    const formData = new FormData(profileForm);
    // let url = null;

    const profileUpdate = {
        user_name: formData.get('username-input'),
        bio: formData.get('bio-input'),
    };

    const imageFile = formData.get('avatar_url');

    if (imageFile.size) {
        const imageName = `${user.id}/${imageFile.name}`;
        const url = await uploadImage('images', imageName, imageFile);
        profileUpdate.avatar_url = url;
    }

    // if (!imageFile.name) {
    //     url = null;
    // } else {
    //     url = await upLoadImage('images', imagePath, imageFile);
    // }

    const response = await updateProfile(profileUpdate);
    error = response.error;
    updateProfileButton.disabled = false;

    if (error) {
        displayError();
    } else {
        location.assign('../');
    }
});

//Display Functions
function displayProfile() {
    usernameInput.value = profile.user_name;
    bioInput.value = profile.bio;
    if (profile.avatar_url) {
        preview.src = profile.avatar_url;
    }
}

function displayError() {
    errorDisplay.textContent = error.message;
}
