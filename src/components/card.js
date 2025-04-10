export function createCard(
  cardData,
  userId,
  handleDeleteCard,
  handleCardClick,
  handleLikeClick,
  cardTemplate
) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCountElement = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Устанавливаем количество лайков
  likeCountElement.textContent = cardData.likes.length;

  // Проверяем, есть ли лайк пользователя на этой карточке
  const isLiked = cardData.likes.some((like) => like._id === userId);

  //Устанавливаем начальное состояние лайка
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  if (cardData.owner._id !== userId) {
    if (deleteButton) {
      deleteButton.remove();
    }
  }

  // Слушатель клика на кнопку лайка
  likeButton.addEventListener("click", () => {
    handleLikeClick(cardData._id, isLiked, likeButton, likeCountElement);
  });

  if (deleteButton) {
    deleteButton.addEventListener("click", function () {
      handleDeleteCard(cardElement, cardData._id);
    });
  }

  cardImage.addEventListener("click", () => {
    handleCardClick(cardData.link, cardData.name);
  });

  return cardElement;
}
