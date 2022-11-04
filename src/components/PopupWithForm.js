import Popup from "../components/Popup.js";
class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._modalForm = this._popupElement.querySelector("form");
    this.handleFormSubmit = handleFormSubmit;
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

  setEventListeners() {
    this._popupElement.addEventListener("submit", () => {
      const formData = this._getInputValues();
      this.handleFormSubmit(formData);
    });

    super.setEventListeners();
  }
}

export default PopupWithForm;
