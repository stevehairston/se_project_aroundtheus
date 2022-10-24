import Popup from "../components/Popup.js";
import { previewModalCloseButton } from "../utils/constants.js";

class PopupWithImages extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  openPopup({ link, name }) {
    this._popupElement.querySelector(".popup__preview-caption").textContent =
      name;
    const image = this._popupElement.querySelector(".popup__preview-image");
    image.src = link;
    image.alt = `Photo of ${name}`;
    super.openPopup();
  }

  setEventListeners() {
    previewModalCloseButton.addEventListener("click", () => {
      this.closePopup(this._popupElement);
    });

    super.setEventListeners();
  }
}

export default PopupWithImages;
