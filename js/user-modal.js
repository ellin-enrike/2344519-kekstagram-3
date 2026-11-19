import { isEscapeKey } from './utils.js';
const bodyElement = document.body;
const DELAY_TIME = 5000;

const showMessage = (templateId, closeButtonClass) => {
  const template = document.querySelector(`#${templateId}`);
  const messageElement = template.content.cloneNode(true).firstElementChild;

  bodyElement.append(messageElement);

  const closeButton = messageElement.querySelector(closeButtonClass);

  const onMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (evt.target === messageElement) {
      closeMessage();
    }
  };

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
    messageElement.removeEventListener('click', onOutsideClick);
  }

  const onCloseButtonClick = () => {
    closeMessage();
  };

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onMessageEscKeydown);
  messageElement.addEventListener('click', onOutsideClick);
};

const showDataError = () => {
  const template = document.querySelector('#data-error');
  const messageElement = template.content.cloneNode(true).firstElementChild;

  bodyElement.append(messageElement);

  setTimeout(() => {
    messageElement.remove();
  }, DELAY_TIME);
};

const showSuccessMessage = () => {
  showMessage('success', '.success__button');
};

const showErrorMessage = () => {
  showMessage('error', '.error__button');
};

export { showDataError, showSuccessMessage, showErrorMessage };
