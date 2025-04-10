const config = {
  baseUrl: `https://mesto.nomoreparties.co/v1/wff-cohort-35`,
  headers: {
    authorization: "dccd93c3-3130-443a-adf6-e0be847312a2",
    "Content-Type": "application/json",
  },
};

// Функция для проверки ответа сервера
const checkResponse = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

// Функция для получения информации о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

// Функция для обновления информации о пользователе
export const updateUserInfo = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(userData),
  }).then(checkResponse);
};

// Функция для обновления аватара пользователя
export const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(checkResponse);
};

// Функция для получения карточек с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

// Функция для добавления новой карточки
export const addCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(cardData),
  }).then(checkResponse);
};

// Функция для удаления карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
};

// Функция для постановки/снятия лайка
export const toggleLike = (cardId, isLiked) => {
  const method = isLiked ? "DELETE" : "PUT";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: method,
    headers: config.headers,
  }).then(checkResponse);
};
