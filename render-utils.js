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

export function renderComment(comment) {
    const li = document.createElement('li');

    const pUser = document.createElement('p');
    pUser.textContent = comment.profiles.user_name;

    const pCreatedDate = document.createElement('p');
    pCreatedDate.textContent = new Date(comment.created_at).toLocaleString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    const divHead = document.createElement('div');
    divHead.append(pUser, pCreatedDate);

    const commentDiv = document.createElement('div');
    const pComment = document.createElement('p');
    pComment.textContent = comment.comment;
    commentDiv.append(pComment);

    li.append(divHead, commentDiv);

    return li;
}
