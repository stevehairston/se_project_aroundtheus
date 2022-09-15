import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  profileEditForm,
  profileTitleInput,
  profileDescriptionInput,
  editProfileModal,
  profileTitleEl,
  profileDescriptionEl,
  openProfileForm,
  openModalWindow,
  closeModalWindow,
  closeModalByEscape,
  fillProfileForm,
} from "./Utils.js";

const profileEditButton = document.querySelector(".profile__button-edit");
const modalWindow = document.querySelectorAll(".popup");
const editModalCloseButton = editProfileModal.querySelector(
  ".popup__button-edit-close"
);

const cardsListEl = document.querySelector(".cards");
const cardAddButton = document.querySelector(".profile__button-add");
const addModalButton = document.querySelector(".profile__button-add");
const addModalWindow = document.querySelector(".popup_type_add");
const addModalCloseButton = addModalWindow.querySelector(
  ".popup__button-add-close"
);
const cardAddForm = document.querySelector(".popup__form-add");
const cardTitlePlaceEl = document.querySelector(
  ".popup__input_type_titlePlace"
);

const previewImageModalWindow = document.querySelector(".js-preview-popup");
const previewImageModalCloseButton = document.querySelector(
  ".popup__button-preview-close"
);
const previewImageEl = document.querySelector(".popup__preview-image");

function handleEditFormSubmit(event) {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;
  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;
  closeModalWindow(editProfileModal);
}

profileEditButton.addEventListener("click", () => {
  openProfileForm(editProfileModal);
});

editModalCloseButton.addEventListener("click", () =>
  closeModalWindow(editProfileModal)
);

addModalButton.addEventListener("click", () => openModalWindow(addModalWindow));

addModalCloseButton.addEventListener("click", () =>
  closeModalWindow(addModalWindow)
);

document.addEventListener("mousedown", function (event) {
  if (event.target.classList.contains("popup")) {
    closeModalWindow(event.target);
  }
});

previewImageModalCloseButton.addEventListener("click", () =>
  closeModalWindow(previewImageModalWindow)
);

profileEditForm.addEventListener("submit", handleEditFormSubmit);

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg ",
  },
];

const cardSelector = "#card-tmpl";

initialCards.forEach((cardData) => {
  renderCard(cardData, cardsListEl);
});

function renderCard(data, container) {
  const card = new Card(data, cardSelector);
  container.prepend(card.getView());
}

const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormElement = editProfileModal.querySelector(".popup__form-edit");
const addFormElement = addModalWindow.querySelector(".popup__form-add");

const editFormValidator = new FormValidator(
  validationSettings,
  editFormElement
);
editFormValidator.enableValidation("popup_form");

const addFormValidator = new FormValidator(validationSettings, addFormElement);
addFormValidator.enableValidation("popup_form");

cardAddForm.addEventListener("submit", handleCreateCardFormSubmit);

function handleCreateCardFormSubmit(event) {
  event.preventDefault();
  const titlePlaceValue = event.target.titlePlace.value;
  const imageLinkValue = event.target.imageLink.value;
  const cardData = { name: titlePlaceValue, link: imageLinkValue };
  renderCard(cardData, cardsListEl);
  closeModalWindow(addModalWindow);

  cardAddForm.reset();
  addFormValidator.disableSubmitButton();
}
