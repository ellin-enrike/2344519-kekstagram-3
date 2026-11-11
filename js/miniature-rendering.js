import { getData } from './api.js';
import { openBigPicture } from './big-picture.js';
import { showDataError } from './user-modal.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhoto = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImgElement = pictureElement.querySelector('.picture__img');

  pictureImgElement.src = photo.url;
  pictureImgElement.alt = photo.description;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  const onPictureElementClick = (evt) => {
    evt.preventDefault();
    openBigPicture(photo);
  };

  pictureElement.addEventListener('click', onPictureElementClick);

  return pictureElement;
};

const renderPhotos = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });

  picturesContainer.append(fragment);
};

getData()
  .then((photos) => {
    renderPhotos(photos);
  })
  .catch(() => {
    showDataError();
  });
