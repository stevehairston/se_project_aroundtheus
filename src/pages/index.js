import "../pages/index.css";
import Card from "../components/Card.js";
import {
  validationSettings,
  cardSelectors,
  addModalButton,
  profileEditButton,
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
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImages from "../components/PopupWithImages.js";
import PopupWithPrompt from "../components/PopupWithPrompt";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const deletePopupWindow = new PopupWithPrompt(deleteConfirmModal);

const cardSection = new Section(
  {
    renderer: (data) => {
      const cardEl = new Card(
        {
          data,
          handleImageClick: () => {
            cardPreviewPopup.openPopup(data);
          },
          handleDeleteClick: () => {
            deletePopupWindow.confirmButtonClick(() => {
              deletePopupWindow.dataSaving(true);
              api
                .deleteCard(data._id)
                .then(() => {
                  cardEl.handleDeleteCard();
                  deletePopupWindow.closePopup();
                })
                .catch((err) => console.log(err))
                .finally(() => {
                  deletePopupWindow.dataSaving(false);
                });
            });
            deletePopupWindow.openPopup();
          },
          handleLikeClick: () => {
            api.likeCard(data._id)
            .then ((data) => {
              cardEl.setLikesInfo(data)
            })
            .catch((err) => console.log(err));
            }
        },
        cardSelectors.cardTemplate
      );
      cardSection.addItem(cardEl.getView());
    },
  },
  cardSelectors.cardSection
);

const addPopupWindow = new PopupWithForm(cardFormModal, (formData) => {
  addPopupWindow.dataSaving(true);
  api
    .addCard({
      name: formData.name,
      link: formData.link,
    })
    .then((data) => {
      cardSection.renderItems([data]);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      deletePopupWindow.dataSaving(false);
    });
    addPopupWindow.closePopup();
});

const editPopupWindow = new PopupWithForm(editFormModal, (formData) => {
  userInfoDisplay.setUserInfo({
    userName: formData.title,
    userDescription: formData.description,
  });
  editPopupWindow.dataSaving(true);
  api.editUserProfile({
    name: formData.title,
    about: formData.description,
  })
  .then((data) => {
  })
  .catch((err) => console.log(err))
  .finally(() => {
    editPopupWindow.dataSaving(false);
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
deletePopupWindow.setEventListeners();
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
    userProfile.setAttribute("id", userData._id);
    userInfoDisplay.setUserInfo({
      userName: userData.name,
      userDescription: userData.about,
      userAvatar: userData.avatar,
    });

    cardSection.renderItems(initialCards);
  })
  .catch((err) => console.log(err));
