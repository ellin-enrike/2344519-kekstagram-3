import { isEscapeKey } from './utils.js';
import { resetScale } from './change-photo-scale.js';
import { resetFilter } from './photo-filters.js';
import {
  validateHashtagsFormat,
  validateHashtagsCount,
  validateHashtagsUniqueness,
  validateCommentLength,
} from './validation.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './user-modal.js';

const FILE_TYPES = ['jpeg','jpg','png',];

const bodyEl = document.body;
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const closeImgFormBtn = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const hashTagFieldElement = document.querySelector('.text__hashtags');
const commentFieldElement = document.querySelector('.text__description');
const photoPreview = imgUploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = imgUploadForm.querySelectorAll('.effects__preview');
const fileChooser = imgUploadForm.querySelector('.img-upload__input');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(`.${it}`));

  if (matches) {
    const photoUrl = URL.createObjectURL(file);

    photoPreview.src = photoUrl;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url("${photoUrl}")`;
    });
  }
});

const pristineConfig = {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
};

const pristine = new Pristine(imgUploadForm, pristineConfig, false);

const HASHTAG_FORMAT_ERROR = 'Хештег должен начинаться с #, содержать только буквы и числа и иметь длину от 2 до 20 символов';
const HASHTAG_COUNT_ERROR = 'Нельзя указать больше пяти хештегов';
const HASHTAG_UNIQUENESS_ERROR = 'Хештеги не должны повторяться';
const COMMENT_LENGTH_ERROR = 'Комментарий не должен превышать 140 символов';

pristine.addValidator(
  hashTagFieldElement,
  validateHashtagsFormat,
  HASHTAG_FORMAT_ERROR
);

pristine.addValidator(
  hashTagFieldElement,
  validateHashtagsCount,
  HASHTAG_COUNT_ERROR
);

pristine.addValidator(
  hashTagFieldElement,
  validateHashtagsUniqueness,
  HASHTAG_UNIQUENESS_ERROR
);

pristine.addValidator(
  commentFieldElement,
  validateCommentLength,
  COMMENT_LENGTH_ERROR
);

const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseImgFormBtnClick();
  }
};

const onTextFieldKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

function showImgForm() {
  imgUploadOverlay.classList.remove('hidden');
  bodyEl.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
}

function onCloseImgFormBtnClick() {
  imgUploadOverlay.classList.add('hidden');
  bodyEl.classList.remove('modal-open');

  imgUploadForm.reset();
  pristine.reset();
  resetScale();
  resetFilter();
  document.removeEventListener('keydown', onEscKeyDown);
}

const onImgUploadFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  const formData = new FormData(imgUploadForm);

  sendData(formData)
    .then(() => {
      showSuccessMessage();
      onCloseImgFormBtnClick();
    })
    .catch(() => {
      showErrorMessage();
    });
};

imgUploadInput.addEventListener('change', showImgForm);
closeImgFormBtn.addEventListener('click', onCloseImgFormBtnClick);

hashTagFieldElement.addEventListener('keydown', onTextFieldKeyDown);
commentFieldElement.addEventListener('keydown', onTextFieldKeyDown);

imgUploadForm.addEventListener('submit', onImgUploadFormSubmit);
