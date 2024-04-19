const BASE_URL = 'https://28.javascript.htmlacademy.pro/kekstagram/data';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const loadData = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})

    .then((response) => {
      if (!response.ok) {
        new Promise.reject();
      }

      return response.json();
    })

    .catch(() => {
      throw new Error (errorText);
    });


const getData = () => loadData(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => loadData(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData};
