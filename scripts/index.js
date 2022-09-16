import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openModalWindow,
  closeModalWindow,
  closeModalByEscape,
} from "./utils.js";

const profileEditButton = document.querySelector(".profile__button-edit");
const modalWindow = document.querySelectorAll(".popup");

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

const profileEditForm = document.querySelector(".popup__form-edit");
const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_title"
);
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);

const editProfileModal = document.querySelector(".popup_type_edit");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

const previewImageModalWindow = document.querySelector(".js-preview-popup");
const previewImageModalCloseButton = document.querySelector(
  ".popup__button-preview-close"
);
const editModalCloseButton = editProfileModal.querySelector(
  ".popup__button-edit-close"
);

const previewImageEl = document.querySelector(".popup__preview-image");
const previewCaption = previewImageModalWindow.querySelector(
  ".popup__preview-caption"
);

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

previewImageModalCloseButton.addEventListener("click", () =>
  closeModalWindow(previewImageModalWindow)
);

profileEditForm.addEventListener("submit", handleEditFormSubmit);

function openProfileForm() {
  openModalWindow(editProfileModal);
  fillProfileForm();
}

function fillProfileForm() {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
}

function openImagePreview(link, name) {
  previewImageEl.src = this._link;
  previewImageEl.alt = `Photo of ${this._name}`;
  previewCaption.textContent = this._name;
  openModalWindow(previewImageModalWindow);
}

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
  const card = new Card(data, cardSelector, openImagePreview);
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
editFormValidator.enableValidation();

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
