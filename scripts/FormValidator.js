class FormValidator {
  constructor(settings, formElement) {
    // this._inputSelector = settings.popup__input;
    this._submitButtonSelector = settings.popup__button;
    this._inactiveButtonClass = settings.popup__button_disabled;
    this._inputErrorClass = settings.popup__input_type_error;
    this._errorClass = settings.popup__error_visible;

    this._formElement = formElement;
  }

  _showInputError(inputElement, validationMessage) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement, validationMessage) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = validationMessage;
    errorMessageElement.classList.remove(this._errorClass);
  }

  /* -------------------------------------------------------------------------------- */
  /*          Revisit toggleButtonState arguments and If\Else statement and inputs    */
  /* -------------------------------------------------------------------------------- */
  _toggleButtonState(inputList, buttonElement, inputElements, submitButton, inactiveButtonClass) {
    if (hasInvalidInput(inputElements)) {
      disableSubmitButton(submitButton, inactiveButtonClass);
    } else {
      enableSubmitButton(submitButton, inactiveButtonClass);
    }
  }

  // check inputlist use below //
  _hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  _checkInputValidity(inputElement) {

  }

  // _setEventListeners() {
  //   this._inputList = Array.from(
  //     this._buttonElement.querySelectorAll(this._inputSelector)
  //   );
  //   const buttonElement = this._form.querySelector(this._submitButtonSelector);

  //   inputList.forEach((inputElement) => {
  //     inputElement.addEventListener("input", () => {
  //       checkInputValidity(this._form, inputElement, rest);
  //       toggleButtonState(inputList, buttonElement, this._inactiveButtonClass);
  //     });
  //   });
  // }

  // enableValidation() {
  //   this._formElement.addEventListener("submit", (evt) => {
  //     evt.preventDefault();
  //   });
  //   _setEventListeners(this._formElement, rest); // "rest" second argument
  // }
}

export default FormValidator;
