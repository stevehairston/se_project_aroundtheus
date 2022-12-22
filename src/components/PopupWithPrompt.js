import Popup from "../components/Popup.js";

class PopupWithPrompt extends Popup {
  constructor(popupSelector, confirmButton) {
    super(popupSelector);
    this._confirmButton = confirmButton
  }

  setEventListeners() {
    // this._confirmButton.addEventListener("submit", () => {
    //   console.log("SUBMITTED")
    // });

    super.setEventListeners();
  }
}

export default PopupWithPrompt;
