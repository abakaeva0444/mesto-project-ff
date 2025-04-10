function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

function showInputError(formElement, inputElement, errorMessage, options) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );

  // Проверяем на несоответствие паттерну
  if (inputElement.validity.patternMismatch) {
    errorMessage = inputElement.dataset.errorMessage; // Получаем сообщение из data-атрибута
  }

  inputElement.classList.add(options.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
}

function hideInputError(formElement, inputElement, options) {
  const errorElement = formElement.querySelector(
    `.${inputElement.name}-input-error`
  );
  inputElement.classList.remove(options.inputErrorClass);
  errorElement.classList.remove(options.errorClass);
  errorElement.textContent = "";
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement, options) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector)); // Находим все формы

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(options.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      options.submitButtonSelector
    );

    toggleButtonState(inputList, buttonElement, options);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        if (!inputElement.validity.valid) {
          showInputError(
            formElement,
            inputElement,
            inputElement.validationMessage,
            options
          );
        } else {
          hideInputError(formElement, inputElement, options);
        }
        toggleButtonState(inputList, buttonElement, options);
      });
    });

    formElement.addEventListener("reset", () => {
      // Вешаем слушатель reset
      setTimeout(() => {
        resetValidation(formElement, options);
      }, 0);
    });
  });
}

function resetValidation(formElement, options) {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, options);
  });
  toggleButtonState(inputList, buttonElement, options);
}

export { enableValidation, resetValidation };
