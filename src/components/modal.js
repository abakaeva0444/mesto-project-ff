function openModal(modal) {
    modal.classList.add('popup_opened');
    document.addEventListener('keydown', closeModalByEscape);
  }
  
  function closeModal(modal) {
    modal.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeModalByEscape);
  }
  
  function closeModalByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closeModal(openedPopup);
    }
  }
  
  export { openModal, closeModal, closeModalByEscape };