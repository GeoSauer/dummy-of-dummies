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

export function renderComment(comment) {
    const li = document.createElement('li');
    li.classList.add('comment');

    const pUser = document.createElement('p');
    pUser.classList.add('user-name');
    pUser.textContent = comment.profiles.user_name;

    const img = document.createElement('img');
    img.classList.add('user-avatar');
    img.src = comment.profiles.avatar_url;

    const pCreatedDate = document.createElement('p');
    pCreatedDate.classList.add('timestamp');
    pCreatedDate.textContent = new Date(comment.created_at).toLocaleString('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });

    const divHead = document.createElement('div');
    divHead.classList.add('user-info');
    divHead.append(pCreatedDate, pUser, img);

    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment-content');
    const pComment = document.createElement('p');
    pComment.textContent = comment.comment;
    commentDiv.append(pComment);

    li.append(divHead, commentDiv);

    return li;
}

// export function renderAnswer(answer) {
//     const li = document.createElement('li');
//     li.classList.add('answer');

//     const pUser = document.createElement('p');
//     pUser.classList.add('user-name');
//     pUser.textContent = answer.profiles.user_name;

//     const img = document.createElement('img');
//     img.classList.add('user-avatar');
//     img.src = answer.profiles.avatar_url;

//     const pCreatedDate = document.createElement('p');
//     pCreatedDate.classList.add('timestamp');
//     pCreatedDate.textContent = new Date(answer.created_at).toLocaleString('en-US', {
//         day: 'numeric',
//         month: 'numeric',
//         year: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//     });

//     const divHead = document.createElement('div');
//     divHead.classList.add('user-info');
//     divHead.append(pCreatedDate, pUser, img);

//     const answerDiv = document.createElement('div');
//     answerDiv.classList.add('answer-content');

//     const pAnswer = document.createElement('p');
//     pAnswer.textContent = answer.answer;

//     const pCode = document.createElement('p');
//     pCode.answerDiv.append(pAnswer);

//     li.append(divHead, answerDiv);

//     return li;
// }
