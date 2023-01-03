import { ESC_KEYCODE } from "../utils/constants.js";

class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    this._popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === ESC_KEYCODE) {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup")) {
        this.closePopup();
      }
    });
      this._popupElement.addEventListener("click", (event) => {
        if (event.target.classList.contains("popup__button-close")) {
          this.closePopup();
        }
    });
  }

}

export default Popup;
