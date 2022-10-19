// Imports

import '../auth/user.js';

$('.nav-itemC').on('click', function (e) {
    updateNav($(this));
});

$('.nav-toggle').on('click', function (e) {
    toggleNav();
});

function updateNav(el) {
    if ($(el).hasClass('nav-toggle')) return;

    $('.nav-itemC').removeClass('nav-active');
    $('.nav-itemC').removeClass('nav-activeBefore');
    $('.nav-itemC').removeClass('nav-activeAfter');
    $(el).addClass('nav-active');
    $(el).prev().addClass('nav-activeBefore');
    $(el).next().addClass('nav-activeAfter');
}

function toggleNav() {
    $('.nav').toggleClass('navcollapse');
    $('.nav-toggle').toggleClass('toggleIcon');
}
