// Функция открытия модального окна
export function openModal(modal) {
  if (modal) {
    modal.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscClose);
  }
}

// Функция закрытия модального окна
export function closeModal(modal) {
  if (modal) {
    modal.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscClose);
  }
}

// Функция закрытия модального окна по нажатию ESC
export function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
