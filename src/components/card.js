function handleLikeClick(likeButton) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
  
  function deleteCard(cardElement) {
    if (cardElement && cardElement.parentNode) {
      cardElement.parentNode.removeChild(cardElement);
    }
  }
  
  
  function createCard(cardData, handleDeleteCard, handleLikeClick) {
    const cardElement = cardTemplate.cloneNode(true).querySelector(".card");
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
  
    likeButton.addEventListener('click', () => {
      handleLikeClick(likeButton);
    });
  
    enableCardImagePopup(cardElement);  
  
    return cardElement;
  }
  export { createCard, handleLikeClick, deleteCard }; 

