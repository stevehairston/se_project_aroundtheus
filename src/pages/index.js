import "../pages/index.css";
import Card from "../components/Card.js";
import {
  validationSettings,
  cardSelectors,
  addModalButton,
  profileEditButton,
  // deleteConfirmButton,
  // openedModal,
  cardFormModal,
  editFormModal,
  deleteConfirmModal,
  previewImageEl,
  cardFormEl,
  editFormEl,
  titleSelector,
  descSelector,
  profileTitleInput,
  profileDescriptionInput,
  aroundUsBaseUrl,
  apiRequestOpts,
  userProfile,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
// import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImages from "../components/PopupWithImages.js";
import PopupWithPrompt from "../components/PopupWithPrompt";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const cardDeleteConfirmPopup = new PopupWithPrompt(deleteConfirmModal, () => {
  addPopupWindow.closePopup();
});

const cardSection = new Section(
  {
    renderer: (data) => {
      const cardEl = new Card(
        {
          data,
          handleImageClick: () => {
            cardPreviewPopup.openPopup(data);
          },
          cardDelConfirm: () => {
            cardDeleteConfirmPopup.openPopup();
          }
        },
        cardSelectors.cardTemplate
      );
      cardSection.addItem(cardEl.getView());
    },
  },
  cardSelectors.cardSection,
);

const addPopupWindow = new PopupWithForm(cardFormModal, (formData) => {
  api.addCard({
    name: formData.name,
    link: formData.link,
  }).then((data) => {
    cardSection.renderItems([data]);
  });
  addPopupWindow.closePopup();
});

const editPopupWindow = new PopupWithForm(editFormModal, (formData) => {
  userInfoDisplay.setUserInfo({
    userName: formData.title,
    userDescription: formData.description,
  });
  api.editUserProfile({
    name: formData.title,
    about: formData.description,
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

const api = new Api(aroundUsBaseUrl, apiRequestOpts);

cardPreviewPopup.setEventListeners();
addPopupWindow.setEventListeners();
editPopupWindow.setEventListeners();
cardDeleteConfirmPopup.setEventListeners();
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

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    // const currentUserId = userData._id;
    userProfile.setAttribute("id", userData._id);

    userInfoDisplay.setUserInfo({
      userName: userData.name,
      userDescription: userData.about,
      userAvatar: userData.avatar,
    });

    cardSection.renderItems(initialCards);
  })
  .catch((err) => console.log(err));

