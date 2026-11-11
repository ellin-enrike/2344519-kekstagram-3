const SERVER_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = () =>
  fetch(`${SERVER_URL}${Route.GET_DATA}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${ErrorText.GET_DATA} (${response.status})`);
      }

      return response.json();
    });

const sendData = (body) =>
  fetch(`${SERVER_URL}${Route.SEND_DATA}`, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${ErrorText.SEND_DATA} (${response.status})`);
      }

      return response;
    });

export { getData, sendData };
