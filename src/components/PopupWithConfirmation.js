import Popup from "../components/Popup.js";
class PopupWithConfirmation extends Popup {
  constructor(popupSelector, setConfirmHandler) {
    super(popupSelector);

    this._setConfirmHandler = setConfirmHandler;
    this._popupButton = this._popupElement.querySelector(".popup__button");
    this._initialText = this._popupButton.textContent;
  }

  setConfirmHandler(confirm) {
    this._setConfirmHandler = confirm;
  }

  renderLoading(isSaving) {
    if (isSaving) {
      this._popupButton.textContent = "Saving...";
    } else {
      this._popupButton.textContent = this._initialText;
    }
  }

  setEventListeners() {
    this._popupButton.addEventListener("click", (event) => {
      this._setConfirmHandler();
    });

    super.setEventListeners();
  }
}

export default PopupWithConfirmation;
