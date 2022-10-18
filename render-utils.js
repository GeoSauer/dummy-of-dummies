export function renderQuestion(question) {
    const a = document.createElement('a');
    a.classList.add('question-link');
    a.href = `/question-detail/?id=${question.id}`;

    const li = document.createElement('li');
    li.classList.add('question-item');

    const div = document.createElement('div');
    div.classList.add('question-text-contents');

    const pTitle = document.createElement('p');
    pTitle.classList.add('question-title');
    pTitle.textContent = question.title;

    const pCategory = document.createElement('p');
    pCategory.classList.add('question-category');
    pCategory.textContent = question.Category;

    const pContent = document.createElement('p');
    pContent.classList.add('question-content');
    pContent.classList.add('truncated');
    pContent.textContent = question.content;

    const img = document.createElement('img');
    img.classList.add('avatar');
    img.src = question.screenshot_url;

    div.append(pTitle, pCategory, pContent);
    li.append(div, img);
    a.append(li);

    return a;
}

export function renderCategoryOption(category) {
    const option = document.createElement('option');
    option.textContent = category.name;
    option.value = category.name;
}
