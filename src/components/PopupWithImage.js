import Popup from "../components/Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._cardName = this._popupElement.querySelector(
      ".popup__preview-caption"
    );
    this._image = this._popupElement.querySelector(".popup__preview-image");
  }

  openPopup({ link, name }) {
    this._cardName.textContent = name;
    this._image.src = link;
    this._image.alt = `Photo of ${name}`;
    super.openPopup();
  }
}

export default PopupWithImage;
