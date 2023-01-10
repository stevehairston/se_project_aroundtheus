import Popup from "../components/Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._modalForm = this._popupElement.querySelector("form");
    this.handleFormSubmit = handleFormSubmit;
    this._popupButton = this._popupElement.querySelector(".popup__button");
    this._initialText = this._popupButton.textContent;
  }

  _getInputValues() {
    const inputList = this._popupElement.querySelectorAll(".popup__input");
    const formData = {};
    inputList.forEach((input) => (formData[input.name] = input.value));
    return formData;
  }

  closePopup() {
    this._modalForm.reset();
    super.closePopup();
  }

  renderLoading(isSaving) {
    if (isSaving) {
      this._popupButton.textContent = "Saving...";
    } else {
      this._popupButton.textContent = this._initialText;
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", () => {
      const formData = this._getInputValues();
      this.handleFormSubmit(formData);
    });

    super.setEventListeners();
  }
}

export default PopupWithForm;
