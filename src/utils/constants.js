export const ESC_KEYCODE = "Escape";
export const openedModal = "popup_is-opened";

export const cardSelectors = {
  cardSection: "cards",
  cardTemplate: "#card-tmpl",
  previewPopup: "popup_type_image",
};

export const validationSettings = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const avatarEditIcon = document.querySelector(".profile__avatar-edit");
export const addModalButton = document.querySelector(".profile__button-add");
export const profileEditButton = document.querySelector(
  ".profile__button-edit"
);
export const avatarFormModal = ".popup_type_avatar";
export const previewImageEl = ".js-preview-popup";
export const cardFormModal = ".popup_type_add";
export const editFormModal = ".popup_type_edit";
export const deleteConfirmModal = ".popup_type_delete";
export const cardTitlePlaceEl = document.querySelector(
  ".popup__input_type_titlePlace"
);

export const avatarFormEl = document.querySelector(".popup__form-avatar");
export const cardFormEl = document.querySelector(".popup__form-add");
export const editFormEl = document.querySelector(".popup__form-edit");
export const titleSelector = ".profile__title";
export const descSelector = ".profile__description";
export const avatarSelector = ".profile__avatar-image";
export const profileTitleInput = editFormEl.querySelector(
  ".popup__input_type_title"
);
export const profileDescriptionInput = editFormEl.querySelector(
  ".popup__input_type_description"
);

export const userProfile = document.querySelector(".profile__title");

export const aroundUsBaseUrl = "https://around.nomoreparties.co/v1/group-12";

export const apiRequestOpts = {
  authorization: "b04238c3-9f11-4fa3-b4d3-a4bcc3f482b3",
  "Content-Type": "application/json",
};
