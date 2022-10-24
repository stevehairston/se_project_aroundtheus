import Popup from "../components/Popup.js";
import {
  cardModalCloseButton,
  editModalCloseButton,
} from "../utils/constants.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._modalForm = this._popupElement.querySelector('form');
    this.handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    // collects data from all the input fields and returns that data as an object
    // get from formData inputs and then use the data to pass to other methods.
    // const inputValues = this._modalForm.getElementsByTagName("input");
    // inputValues.forEach(value => formData.append())
    // return formData = { name: titlePlaceValue, link: imageLinkValue };
  }

  closePopup() {
    this._modalForm.reset();
    super.closePopup();
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", () => {
      const formData = this._getInputValues();
      // this.handleFormSubmit(formData);
      this.handleFormSubmit();
    });
    cardModalCloseButton.addEventListener("click", () => {
      this.closePopup(this._popupElement);
    });

    editModalCloseButton.addEventListener("click", () => {
      this.closePopup(this._popupElement);
    });

    super.setEventListeners();
  }
}

// Add the setUserInfo method of userInfo (instance in Index.js) to the Profile popup PopupWithForm instance.

export default PopupWithForm;
