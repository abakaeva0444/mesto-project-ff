import '../index.css';
import { createCard, handleLikeClick, deleteCard } from './card';
import { openModal, closeModal, closeModalByEscape } from './modal'; 
import { initialCards } from './cards.js';

const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup_type_edit .popup__form');
const nameInput = document.querySelector('.popup_type_edit .popup__input_type_name');
const jobInput = document.querySelector('.popup_type_edit .popup__input_type_description');

function enableCardImagePopup(cardElement) {
  const cardImage = cardElement.querySelector('.card__image');
  const popupImageElement = document.querySelector('.popup_type_image .popup__image');
  const popupCaption = document.querySelector('.popup_type_image .popup__caption');

  cardImage.addEventListener('click', () => {
    popupImageElement.src = cardImage.src;
    popupImageElement.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
    openModal(popupImage); 
  });
}

function renderCard(cardData) {
  const cardElement = createCard(cardData, deleteCard, handleLikeClick);
  placesList.prepend(cardElement);
}

initialCards.forEach(renderCard);

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit); 
});

profileAddButton.addEventListener('click', () => {
  openModal(popupAdd); 
});


function handleFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newDescription = jobInput.value;
  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
  closeModal(popupEdit); 
}

formElement.addEventListener('submit', handleFormSubmit);

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closeModal(popup); 
  });
});