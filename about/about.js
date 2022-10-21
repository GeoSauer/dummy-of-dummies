import { signOutUser } from '../fetch-utils.js';

const navSignout = document.getElementById('nav-signout');

navSignout.addEventListener('click', () => {
    signOutUser();
});
