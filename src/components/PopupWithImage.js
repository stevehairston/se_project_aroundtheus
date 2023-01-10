import Popup from "../components/Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._cardName = this._popupElement.querySelector(".popup__preview-caption")
  }

  openPopup({ link, name }) {
    this._cardName.textContent = name;
    const image = this._popupElement.querySelector(".popup__preview-image");
    image.src = link;
    image.alt = `Photo of ${name}`;
    super.openPopup();
  }
}

export default PopupWithImage;
