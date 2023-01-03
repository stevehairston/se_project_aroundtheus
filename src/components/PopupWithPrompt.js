import Popup from "../components/Popup.js";
class PopupWithPrompt extends Popup {
    constructor(popupSelector, confirmButtonClick) {
    super(popupSelector);

    this._confirmButtonClick = confirmButtonClick
    this._modalForm = this._popupElement.querySelector("form");
    this._popupButton = this._popupElement.querySelector(".popup__button");
    this._initialText = this._popupButton.textContent
  }

  confirmButtonClick(confirm) {
    this._confirmButtonClick = confirm;
  }

  dataSaving(isSaving) {
    if (isSaving) {
      this._popupButton.textContent = "Saving...";
    }
    else
    {this._popupButton.textContent = this._initialText;
    }
  }

  setEventListeners() {
    this._popupButton.addEventListener("click", (event) => {
      this._confirmButtonClick();
    });

    super.setEventListeners();
  }

}

export default PopupWithPrompt;
