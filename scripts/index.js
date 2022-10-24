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
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
// import {
//   openModalWindow,
//   closeModalWindow,
//   closeModalByEscape,
// } from "./utils.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImages from "../components/PopupWithImages.js";
import Section from "../components/Section.js";
// import UserInfo from "../components/UserInfo.js";

// should probably be moved into constant and maybe they're the
// selectors and then refactor editformmodal and addmodal validators to accept a selector or have
// a selector and do the selection...
// or have the selector in the constant (latter not very clean)

// const addModalWindow = document.querySelector(".popup_type_add");
// const editProfileModal = document.querySelector(".popup_type_edit");

// const cardList = new Section({
//   renderer: (data) => {
//     const card - new Card(PageTransitionEventdata,
//       handleCardClick: () => {
//         cardPreviewPopup.open(data);
//       })
//   }
// })

// Create instances of the classes
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

const AddPopupWindow = new PopupWithForm(cardFormModal,
    () => {
    event.preventDefault();
    // const titlePlaceValue = event.target.titlePlace.value;
    // const imageLinkValue = event.target.imageLink.value;
    AddPopupWindow._getInputValues(titlePlaceValue, imageLinkValue)
    const formData = { name: titlePlaceValue, link: imageLinkValue };
    // CardSection.addItem(formData, cardsListEl);
    AddPopupWindow.closePopup(cardFormModal);
}
  );

// const EditPopupWindow = new PopupWithForm(editFormModal,
//     (formData) => {
//   const titleValue = event.target.title.value;
//   const descriptionValue = event.target.description.value;
//   profileTitleEl.textContent = titleValue;
//   profileDescriptionEl.textContent = descriptionValue;
//   closePopup(editFormModal);
// }
//   );

const CardPreviewPopup = new PopupWithImages(previewImageEl);

const editFormValidator = new FormValidator(validationSettings, editFormModal);
const cardFormValidator = new FormValidator(validationSettings, cardFormModal);

// const userInfoPopup = new PopupWithForm({
//   popupSelector: popupConfig.editFormalModalWindows,
//   handleFormSubmit: (data) => {
//     userInfo.setUserInfo(data)
//   }
// });

// initialize all instances

CardSection.renderItems(initialCards);
CardPreviewPopup.setEventListeners();
AddPopupWindow.setEventListeners();
// EditPopupWindow.setEventListeners();
// editFormValidator.enableValidation();
// cardFormValidator.enableValidation();

addModalButton.addEventListener("click", () => {
  AddPopupWindow.openPopup(cardFormModal);
});
profileEditButton.addEventListener("click", () => {
  EditPopupWindow.openPopup(editFormModal);
});



// all the rest - event listeners for opening edit and card-add button
// select inside index.js and then run the popup with form open

// PopupWithForm - adds the functionality of having the form inside
// the popup that you catch the submit function and pull all of the
// values out of the inputs and then pass that to whatever
// the submit function is that is passed to it
// Section - (should accept a renderer and a class, a rendereritem
// function)
// UserInfo.js - selects the user name and title and what controls
// when they change. Passing data into from the edit form and from input
// into the form when it is opened (the name and title)

//Validators still live in index.js
