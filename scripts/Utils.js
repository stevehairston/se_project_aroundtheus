//Event handlers and Open\Close Modal Windows


class Utils {
    constructor() {

    }

_openProfileForm() {
    openModalWindow(editProfileModal);
    fillProfileForm();
}

_handleEditFormSubmit(event) {
    event.preventDefault();
    const titleValue = event.target.title.value;
    const descriptionValue = event.target.description.value;
    profileTitleEl.textContent = titleValue;
    profileDescriptionEl.textContent = descriptionValue;
    closeModalWindow(editProfileModal);
}

_openModalWindow(modal) {
    modal.classList.add("popup_is-opened");
    document.addEventListener("keydown", closeModalByEscape);
  }
  
_closeModalWindow(modal) {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closeModalByEscape);
  }
  
_closeModalByEscape(event) {
    if (event.key === "Escape") {
      const openedModal = document.querySelector(".popup_is-opened");
      closeModalWindow(openedModal);
    }
  }

}

const profileEditButton = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector(".popup_type_edit");
const modalWindow = document.querySelectorAll(".popup");
const editModalCloseButton = editProfileModal.querySelector(
  ".popup__button-edit-close"
);
const profileEditForm = document.querySelector(".popup__form-edit");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

const addModalButton = document.querySelector(".profile__button-add");
const addModalWindow = document.querySelector(".popup_type_add");

const addModalCloseButton = addModalWindow.querySelector(
  ".popup__button-add-close"
);
const cardAddForm = document.querySelector(".popup__form-add");





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

profileEditForm.addEventListener("submit", handleEditFormSubmit);



cardAddForm.addEventListener("submit", handleCreateCardFormSubmit);

function handleCreateCardFormSubmit(event) {
  event.preventDefault();
  const titlePlaceValue = event.target.titlePlace.value;
  const imageLinkValue = event.target.imageLink.value;
  const cardData = { name: titlePlaceValue, link: imageLinkValue };
  const hydratedCardEl = generateCardElement(cardData);
  renderCard(hydratedCardEl, cardsListEl);
  closeModalWindow(addModalWindow);

  cardAddForm.reset();
  disableSubmitButton(
    cardAddForm.querySelector(config.submitButtonSelector),
    config.inactiveButtonClass
  );
}