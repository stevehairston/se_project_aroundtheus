import "../pages/index.css";
import Card from "../components/Card.js";
import {
  validationSettings,
  cardSelectors,
  avatarEditIcon,
  addModalButton,
  profileEditButton,
  avatarFormModal,
  cardFormModal,
  editFormModal,
  deleteConfirmModal,
  previewImageEl,
  avatarImage,
  avatarFormEl,
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
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const deletePopupWindow = new PopupWithConfirmation(deleteConfirmModal);

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
                .catch((err) => console.log(`An error has occurred ${err}`))
                .finally(() => {
                  deletePopupWindow.dataSaving(false);
                });
            });
            deletePopupWindow.openPopup();
          },
          handleLikeClick: () => {
            if (cardEl.isLiked()) {
              api
                .removeLike(data._id)
                .then((res) => {
                  cardEl.displayLikes(res.likes);
                })
                .catch((err) => {
                  console.log(`An error has occurred ${err}`);
                });
            } else {
              api
                .addLike(data._id)
                .then((res) => {
                  cardEl.displayLikes(res.likes);
                })
                .catch((err) => {
                  console.log(`An error has occurred ${err}`);
                });
            }
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
  addPopupWindow.dataSaving(true);
  api
    .addCard({
      name: formData.name,
      link: formData.link,
    })
    .then((data) => {
      cardSection.renderItems([data]);
    })
    .catch((err) => console.log(`An error has occurred ${err}`))
    .finally(() => {
      addPopupWindow.dataSaving(false);
    });
  addPopupWindow.closePopup();
});

const editPopupWindow = new PopupWithForm(editFormModal, (formData) => {
  userInfoDisplay.setUserInfo({
    userName: formData.title,
    userDescription: formData.description,
  });
  editPopupWindow.dataSaving(true);
  api
    .editUserProfile({
      name: formData.title,
      about: formData.description,
    })
    .then((data) => {})
    .catch((err) => console.log(`An error has occurred ${err}`))
    .finally(() => {
      editPopupWindow.dataSaving(false);
    });
  editPopupWindow.closePopup();
});

const avatarPopupWindow = new PopupWithForm(avatarFormModal, (formData) => {
  avatarPopupWindow.dataSaving(true);
  api
    .updateAvatar({
      link: formData.link,
    })
    .then((data) => {
      console.log(data);
      avatarImage.src = data.avatar;
    })
    .catch((err) => console.log(`An error has occurred ${err}`))
    .finally(() => {
      avatarPopupWindow.dataSaving(false);
    });
  avatarPopupWindow.closePopup();
});

const userInfoDisplay = new UserInfo({
  userTitleSelector: titleSelector,
  userDescSelector: descSelector,
});

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const cardFormValidator = new FormValidator(validationSettings, cardFormEl);
const avatarFormValidator = new FormValidator(validationSettings, avatarFormEl);
const cardPreviewPopup = new PopupWithImages(previewImageEl);

const api = new Api(aroundUsBaseUrl, apiRequestOpts);

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
  .catch((err) => console.log(`An error has occurred ${err}`));

cardPreviewPopup.setEventListeners();
addPopupWindow.setEventListeners();
editPopupWindow.setEventListeners();
deletePopupWindow.setEventListeners();
avatarPopupWindow.setEventListeners();
editFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

avatarEditIcon.addEventListener("click", () => {
  avatarPopupWindow.openPopup();
  avatarFormValidator.resetValidation();
});

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
