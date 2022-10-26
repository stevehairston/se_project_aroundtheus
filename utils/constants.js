export const ESC_KEYCODE = "Escape";
export const openedModal = "popup_is-opened";

export const initialCards = [
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

export const cardSelectors = {
  cardSection: "cards",
  cardTemplate: "#card-tmpl",
  previewPopup: "popup_type_image"
}

export const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const addModalButton = document.querySelector(".profile__button-add");
export const profileEditButton = document.querySelector(".profile__button-edit");
export const previewImageEl = ".js-preview-popup"
export const cardFormModal = ".popup_type_add";
export const editFormModal = ".popup_type_edit";
export const cardTitlePlaceEl = document.querySelector(
  ".popup__input_type_titlePlace"
);
export const cardModalCloseButton = document.querySelector(
  ".popup__button-add-close"
);
export const editModalCloseButton = document.querySelector(
  ".popup__button-edit-close"
);
export const previewModalCloseButton = document.querySelector(
  ".popup__button-preview-close"
);
export const cardFormEl = document.querySelector(".popup__form-add");
export const editFormEl = document.querySelector(".popup__form-edit");
export const nameSelector = ".profile__name"
export const descSelector = ".profile__description"

export const profileTitleEl = document.querySelector(".profile__title");
export const profileDescriptionEl = document.querySelector(".profile__description");

export const profileTitleInput = editFormEl.querySelector(
  ".popup__input_type_title"
);

export const profileDescriptionInput = editFormEl.querySelector(
  ".popup__input_type_description"
);
