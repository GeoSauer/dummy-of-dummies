import './auth/user.js';
const navItemC = document.querySelector('.nav-itemC');

const navToggle = document.querySelector('.nav-toggle');

navItemC.addEventListener('click', (e) => {
    e.preventDefault();
    updateNav(document.querySelector(this));
});

navToggle.addEventListener('click', (e) => {
    e.preventDefault();
    toggleNav();
});

function updateNav(el) {
    if (document.querySelector(el).classList.contains('nav-toggle')) return;

    document.querySelector('.nav-itemC').classList.remove('nav-active');
    document.querySelector('.nav-itemC').classList.remove('nav-activeBefore');
    document.querySelector('.nav-itemC').classList.remove('nav-activeAfter');
    document.querySelector(el).classList.add('nav-active');
    document.querySelector(el).previousElementSibling.classList.add('nav-activeBefore');
    document.querySelector(el).nextElementSibling.classList.add('nav-activeAfter');
}

function toggleNav() {
    document.querySelector('.nav').classList.toggle('closed');
    document.querySelector('.nav-toggle').classList.toggle('move-toggle');
}
