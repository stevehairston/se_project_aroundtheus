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

const CardSection = new Section(
  {
    renderer: (data) => {
      const cardEl = new Card(
        {
          data,
          handleImageClick: () => {
            CardPreviewPopup.openPopup(data);
          },
        },
        cardSelectors.cardTemplate
      );
      CardSection.addItem(cardEl.getView());
    },
  },
  cardSelectors.cardSection
);

const AddPopupWindow = new PopupWithForm(cardFormModal, (formData) => {
  event.preventDefault();
  const newCard = [];
  newCard.push(formData);
  CardSection.renderItems(newCard);
  AddPopupWindow.closePopup(cardFormModal);
});

const EditPopupWindow = new PopupWithForm(editFormModal, (formData) => {
  event.preventDefault();
  UserInfoDisplay.setUserInfo({
    userName: formData.title,
    userDescription: formData.description,
  });
  EditPopupWindow.closePopup(editFormModal);
});

const UserInfoDisplay = new UserInfo({
  userTitleSelector: titleSelector,
  userDescSelector: descSelector,
});
const editFormValidator = new FormValidator(validationSettings, editFormEl);
const cardFormValidator = new FormValidator(validationSettings, cardFormEl);
const CardPreviewPopup = new PopupWithImages(previewImageEl);

CardSection.renderItems(initialCards);
CardPreviewPopup.setEventListeners();
AddPopupWindow.setEventListeners();
EditPopupWindow.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();

addModalButton.addEventListener("click", () => {
  AddPopupWindow.openPopup(cardFormModal);
});
profileEditButton.addEventListener("click", () => {
  EditPopupWindow.openPopup(editFormModal);
  const userInfo = UserInfoDisplay.getUserInfo();
  profileTitleInput.value = userInfo.userName;
  profileDescriptionInput.value = userInfo.userDescription;
});
