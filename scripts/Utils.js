export const profileEditForm = document.querySelector(".popup__form-edit");
export const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_title"
);
export const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);

export const editProfileModal = document.querySelector(".popup_type_edit");
export const profileTitleEl = document.querySelector(".profile__title");
export const profileDescriptionEl = document.querySelector(
  ".profile__description"
);

export function openProfileForm() {
  openModalWindow(editProfileModal);
  fillProfileForm();
}

export function openModalWindow(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEscape);
}

export function closeModalWindow(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

export function closeModalByEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModalWindow(openedModal);
  }
}

export function fillProfileForm() {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
}
