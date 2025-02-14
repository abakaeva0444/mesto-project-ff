const placesList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template");

function createCard(cardData, handleDeleteCard) {
  const cardElement = cardTemplate
    .cloneNode(true)
    .content.querySelector(".card");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", function () {
    handleDeleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  if (cardElement && cardElement.parentNode) {
    cardElement.parentNode.removeChild(cardElement);
  }
}

function renderCard(cardData) {
  const cardElement = createCard(cardData, deleteCard);
  placesList.prepend(cardElement);
}

initialCards.forEach(renderCard);
