import "../index.css";
import { createCard, deleteCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, resetValidation } from "./validation.js";

import {
  getUserInfo,
  updateUserInfo,
  updateAvatar,
  getInitialCards,
  addCard,
  deleteCard as deleteCardApi,
  toggleLike,
} from "./api.js";

// профиль
const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const profileAddButton = document.querySelector(".profile__add-button");

// попапы
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const popupImageElement = document.querySelector(".popup_type_image");
const popupCaption = document.querySelector(".popup__caption");

//forms
const formEditProfile = document.forms["edit-profile"];
const formAddCard = document.forms["new-place"];
const formAvatarEdit = document.forms["edit-avatar"];

//inputs
const nameInput = formEditProfile.elements.name;
const descriptionInput = formEditProfile.elements.description;
const cardLinkInput = formAddCard.elements.link;
const cardNameInput = formAddCard.elements["place-name"];
const avatarInput = formAvatarEdit.elements.link;

// other
const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
let userId = null;

// Function renderCard

function renderCard(cardData, userId, handleLikeClick) {
  const cardElement = createCard(
    cardData,
    userId,
    handleDeleteCard,
    handleCardClick,
    handleLikeClick, // передаем колбэк лайка
    cardTemplate
  );

  placesList.prepend(cardElement);
}

//Функция для открытия карточки
function handleCardClick(link, name) {
  const popupImage = popupImageElement.querySelector(".popup__image");
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(popupImageElement);
}
// // Функция для удаления карточки

function handleDeleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    });
}

function initializePage() {
  Promise.all([getInitialCards(), getUserInfo()])
    .then(([cards, userData]) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      userId = userData._id;

      cards.forEach((cardData) => {
        renderCard(cardData, userId, handleLikeClick); // передаем колбэк лайка при создании
      });
    })
    .catch((error) => {
      console.error("Ошибка инициализации страницы:", error);
    });
}

// Функция обработчик лайка
function handleLikeClick(cardId, isLiked, likeButton, likeCountElement) {
  toggleLike(cardId, isLiked) // Передаем текущее состояние лайка
    .then((data) => {
      likeCountElement.textContent = data.likes.length; // Обновляем счетчик лайков
      likeButton.classList.toggle("card__like-button_is-active"); // Переключаем класс
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция для редактирования профиля
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  updateUserInfo(nameValue, descriptionValue)
    .then((updatedUserInfo) => {
      profileTitle.textContent = updatedUserInfo.name;
      profileDescription.textContent = updatedUserInfo.about;
      closeModal(popupEditProfile);
    })
    .catch((error) => {
      console.error("Ошибка при редактировании профиля:", error);
    });
}

// Функция для добавления карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const linkValue = cardLinkInput.value;
  const nameValue = cardNameInput.value;

  addCard(nameValue, linkValue)
    .then((newCard) => {
      renderCard(newCard, userId, handleLikeClick); //  передаем колбэк лайка
      closeModal(popupAddCard);
      formAddCard.reset();
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error);
    });
}

// Функция для обновления аватара
function handleAvatarEditSubmit(evt) {
  evt.preventDefault();
  const avatarValue = avatarInput.value;

  updateAvatar(avatarValue)
    .then((updatedUserInfo) => {
      profileImage.style.backgroundImage = `url(${updatedUserInfo.avatar})`;
      closeModal(popupEditAvatar);
      formAvatarEdit.reset();
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
    });
}

// Обновление аватара
profileImage.addEventListener("click", () => {
  openModal(popupEditAvatar);
  resetValidation(formAvatarEdit, validationConfig);
});

// Обработчик отправки формы редактирования аватара
formAvatarEdit.addEventListener("submit", handleAvatarEditSubmit);

// Обработчик отправки формы редактирования профиля
formEditProfile.addEventListener("submit", handleProfileEditSubmit);

// Обработчик отправки формы добавления карточки
formAddCard.addEventListener("submit", handleAddCardSubmit);

//Редактирование профиля
profileEditButton.addEventListener("click", () => {
  openModal(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  resetValidation(formEditProfile, validationConfig);
});

//Добавление карточки
profileAddButton.addEventListener("click", () => {
  openModal(popupAddCard);
  resetValidation(formAddCard, validationConfig);
});

//закрытие модалок по крестику и оверлею
const popups = document.querySelectorAll(".popup");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});

enableValidation(validationConfig);
initializePage();
