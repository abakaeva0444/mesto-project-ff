// Функция для обработки лайка карточки
export function handleLikeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// Функция для создания карточки
export function createCard(
  cardData,
  handleDeleteCard,
  handleLikeCard,
  handleCardClick,
  cardTemplate
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteButton.addEventListener("click", function () {
    handleDeleteCard(cardElement);
  });

  likeButton.addEventListener("click", function () {
    handleLikeCard(likeButton);
  });

  cardImage.addEventListener("click", () => {
    handleCardClick(cardData);
  });

  return cardElement;
}

// Функция для удаления карточки
export function deleteCard(cardElement) {
  cardElement.remove();
}
