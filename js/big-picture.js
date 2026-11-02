import { isEscapeKey } from "./utils.js";
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const shownCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const caption = bigPicture.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const body = document.body;

const renderComments = (comments) => {
  commentsList.innerHTML = '';
  comments.forEach((comment) => {
    const li = document.createElement('li');
    li.className = 'social__comment';

    const img = document.createElement('img');
    img.className = 'social__picture';
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const p = document.createElement('p');
    p.className = 'social__text';
    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);
    commentsList.appendChild(li);
  });
};

export const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  shownCount.textContent = photo.comments.length;
  totalCount.textContent = photo.comments.length;
  caption.textContent = photo.description;

  renderComments(photo.comments);

  const commentCountEl = document.querySelector('.social__comment-count');
  const loaderEl = document.querySelector('.comments-loader');
  if (commentCountEl) {
    commentCountEl.classList.add('hidden');
  }
  if (loaderEl) {
    loaderEl.classList.add('hidden');
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  const commentCountEl = document.querySelector('.social__comment-count');
  const loaderEl = document.querySelector('.comments-loader');
  if (commentCountEl) {
    commentCountEl.classList.remove('hidden');
  }
  if (loaderEl) {
    loaderEl.classList.remove('hidden');
  }
};

export const onCloseButtonClick = () => {
  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  });
};
onCloseButtonClick();

