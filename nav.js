import './auth/user.js';

const navToggle = document.querySelector('.nav-toggle');

navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleNav();
});

function toggleNav() {
    document.querySelector('.nav').classList.toggle('closed');
    document.querySelector('.nav-toggle').classList.toggle('move-toggle');
}
