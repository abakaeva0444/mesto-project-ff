function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

// Функция для показа ошибки
function showInputError(formElement, inputElement, errorMessage, options) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);

  // Кастомные проверки
  if (inputElement.validity.valueMissing) {
    errorMessage = "Вы пропустили это поле.";
  } else if (inputElement.name === 'place-name' && !/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(inputElement.value)) {
    errorMessage = "Разрешены только латинские и кириллические буквы, пробелы и дефисы";
  } else if (inputElement.type === 'url' && !isValidURL(inputElement.value)) {
    errorMessage = "Введите адрес сайта.";
  }

  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
}

// Функция для скрытия ошибки
function hideInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = '';
}

// Функция проверки валидности поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция переключения активности кнопки
function toggleButtonState(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}

function enableValidation(options) {
  const formElement = document.querySelector(options.formSelector);
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  
  toggleButtonState(inputList, buttonElement, options);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, options);
      } else {
        hideInputError(formElement, inputElement, options);
      }
      toggleButtonState(inputList, buttonElement, options);
    });
  });
}

// Очистка
function resetValidation(formElement, options) {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, options); 
  });
  toggleButtonState(inputList, buttonElement, options);
}

export { enableValidation, resetValidation };