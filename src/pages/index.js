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
  avatarFormEl,
  cardFormEl,
  editFormEl,
  titleSelector,
  descSelector,
  avatarSelector,
  profileTitleInput,
  profileDescriptionInput,
  aroundUsBaseUrl,
  apiRequestOpts,
  userProfile,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../utils/Api.js";

const deletePopupWindow = new PopupWithConfirmation(deleteConfirmModal);

const cardSection = new Section(
  {
    renderer: (data) => {
      const cardEl = new Card(
        {
          data,
          userId,
          handleImageClick: () => {
            cardPreviewPopup.openPopup(data);
          },
          handleDeleteClick: () => {
            deletePopupWindow.setConfirmHandler(() => {
              deletePopupWindow.renderLoading(true);
              api
                .deleteCard(data._id)
                .then(() => {
                  cardEl.handleDeleteCard();
                  deletePopupWindow.closePopup();
                })
                .catch((err) => console.log(`An error has occurred ${err}`))
                .finally(() => {
                  deletePopupWindow.renderLoading(false);
                });
            });
            deletePopupWindow.openPopup();
          },
          handleLikeClick: () => {
            if (cardEl.isLiked()) {
              api
                .removeLike(data._id)
                .then((res) => {
                  cardEl.updateLikes(res.likes);
                })
                .catch((err) => {
                  console.log(`An error has occurred ${err}`);
                });
            } else {
              api
                .addLike(data._id)
                .then((res) => {
                  cardEl.updateLikes(res.likes);
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
  addPopupWindow.renderLoading(true);
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
      addPopupWindow.renderLoading(false);
    });
  addPopupWindow.closePopup();
});

const editPopupWindow = new PopupWithForm(editFormModal, (formData) => {
  editPopupWindow.renderLoading(true);
  api
    .editUserProfile({
      name: formData.title,
      about: formData.description,
    })
    .then((data) => {
      userInfoDisplay.setUserInfo({
        userName: formData.title,
        userDescription: formData.description,
      });
    })
    .catch((err) => console.log(`An error has occurred ${err}`))
    .finally(() => {
      editPopupWindow.renderLoading(false);
    });
  editPopupWindow.closePopup();
});

const avatarPopupWindow = new PopupWithForm(avatarFormModal, (formData) => {
  avatarPopupWindow.renderLoading(true);
  api
    .updateAvatar({
      link: formData.link,
    })
    .then((data) => {
      userInfo.setUserAvatar(data.avatar);
    })
    .catch((err) => console.log(`An error has occurred ${err}`))
    .finally(() => {
      avatarPopupWindow.renderLoading(false);
    });
  avatarPopupWindow.closePopup();
});

const userInfoDisplay = new UserInfo({
  userTitleSelector: titleSelector,
  userDescSelector: descSelector,
});

const userInfo = new UserInfo({
  userAvatarSelector: avatarSelector,
});

const editFormValidator = new FormValidator(validationSettings, editFormEl);
const cardFormValidator = new FormValidator(validationSettings, cardFormEl);
const avatarFormValidator = new FormValidator(validationSettings, avatarFormEl);
const cardPreviewPopup = new PopupWithImage(previewImageEl);

const api = new Api(aroundUsBaseUrl, apiRequestOpts);

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userId = userData._id;
    userInfoDisplay.setUserInfo({
      userName: userData.name,
      userDescription: userData.about,
    });
    userInfo.setUserAvatar(userData.avatar);
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

function fillProfileForm(userInfo) {
  profileTitleInput.value = userInfo.userName;
  profileDescriptionInput.value = userInfo.userDescription;
}

profileEditButton.addEventListener("click", () => {
  editPopupWindow.openPopup();
  editPopupWindow.fillProfileForm();
  const userInfo = userInfoDisplay.getUserInfo();
  fillProfileForm(userInfo);
  editFormValidator.resetValidation();
});
