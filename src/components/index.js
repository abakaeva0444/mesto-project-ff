import "../index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, handleLikeCard } from "./card.js";
import { openModal, closeModal, handleEscClose } from "./modal.js";

// Получаем доступ к элементам DOM
const placesList = document.querySelector(".places__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

// Объявление переменных
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// редактирования профиля
const formEditElement = popupEdit.querySelector(".popup__form");
const nameInput = formEditElement.querySelector(".popup__input_type_name");
const jobInput = formEditElement.querySelector(
  ".popup__input_type_description"
);

// добавление новой карточки
const formNewCardElement = popupNewCard.querySelector(".popup__form");
const cardNameInput = formNewCardElement.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInput = formNewCardElement.querySelector(
  ".popup__input_type_url"
);

// Функция для открытия попапа с изображением
function handleCardClick(cardData) {
  const popupImageElement = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");

  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
  popupCaption.textContent = cardData.name;

  openModal(popupImage);
}

// Функция для рендеринга карточки
function renderCard(cardData) {
  const cardElement = createCard(
    cardData,
    deleteCard,
    handleLikeCard,
    handleCardClick,
    cardTemplate
  );
  placesList.prepend(cardElement);
}

// Обработчики событий для кнопок открытия
editButton.addEventListener("click", () => {
  openModal(popupEdit);
  //Заполняем поля формы при открытии
  if (profileName) {
    nameInput.value = profileName.textContent;
  }
  if (profileDescription) {
    jobInput.value = profileDescription.textContent;
  }
});

addButton.addEventListener("click", () => {
  openModal(popupNewCard);
});

// Обработчики событий для кнопок закрытия (крестиков)
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const modal = event.target.closest(".popup");
    if (modal) {
      closeModal(modal);
    }
  });
});

// Обработчик события submit для формы редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  if (profileName) {
    profileName.textContent = newName;
  }
  if (profileDescription) {
    profileDescription.textContent = newJob;
  }

  closeModal(popupEdit);
}

// Обработчик события submit для формы добавления новой карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  const newCardData = {
    name: cardName,
    link: cardLink,
  };

  renderCard(newCardData); // Добавляем новую карточку

  closeModal(popupNewCard); // Закрываем модальное окно после добавления
  formNewCardElement.reset(); // Очищаем поля формы
}

// Прикрепляем обработчик к форме редактирования:
formEditElement.addEventListener("submit", handleFormSubmit);

// Прикрепляем обработчик к форме добавления новой карточки:
formNewCardElement.addEventListener("submit", handleAddCardSubmit);

// Отображение начальных карточек
initialCards.forEach(renderCard);

// Обработчик клика по оверлею
document.addEventListener("mousedown", (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closeModal(evt.target);
  }
});

// Обработчик закрытия по Esc
document.addEventListener("keydown", handleEscClose);