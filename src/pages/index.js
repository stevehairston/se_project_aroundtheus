import "../pages/index.css";
import Card from "../components/Card.js";
import {
  validationSettings,
  initialCards,
  cardSelectors,
  addModalButton,
  profileEditButton,
  openedModal,
  cardFormModal,
  editFormModal,
  previewImageEl,
  cardFormEl,
  editFormEl,
  titleSelector,
  descSelector,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImages from "../components/PopupWithImages.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const cardSection = new Section(
  {
    renderer: (data) => {
      const cardEl = new Card(
        {
          data,
          handleImageClick: () => {
            cardPreviewPopup.openPopup(data);
          },
        },
        cardSelectors.cardTemplate
      );
      cardSection.addItem(cardEl.getView());
    },
  },
  cardSelectors.cardSection
);

const addPopupWindow = new PopupWithForm(cardFormModal, (formData) => {
  const newCard = [];
  newCard.push(formData);
  cardSection.renderItems(newCard);
  addPopupWindow.closePopup();
});

const editPopupWindow = new PopupWithForm(editFormModal, (formData) => {
  userInfoDisplay.setUserInfo({
    userName: formData.title,
    userDescription: formData.description,
  });
  editPopupWindow.closePopup();
});

const userInfoDisplay = new UserInfo({
  userTitleSelector: titleSelector,
  userDescSelector: descSelector,
});
const editFormValidator = new FormValidator(validationSettings, editFormEl);
const cardFormValidator = new FormValidator(validationSettings, cardFormEl);
const cardPreviewPopup = new PopupWithImages(previewImageEl);

cardSection.renderItems(initialCards);
cardPreviewPopup.setEventListeners();
addPopupWindow.setEventListeners();
editPopupWindow.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

addModalButton.addEventListener("click", () => {
  addPopupWindow.openPopup();
  cardFormValidator.resetValidation();

});
profileEditButton.addEventListener("click", () => {
  editPopupWindow.openPopup();
  const userInfo = userInfoDisplay.getUserInfo();
  profileTitleInput.value = userInfo.userName;
  profileDescriptionInput.value = userInfo.userDescription;
  editFormValidator.resetValidation();
});
