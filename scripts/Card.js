const previewImageModalWindow = document.querySelector(".js-preview-popup");

const previewImageModalCloseButton = document.querySelector(
  ".popup__button-preview-close"
);
const previewImageEl = document.querySelector(".popup__preview-image");

// document.addEventListener("mousedown", function (event) {
//   if (event.target.classList.contains("popup")) {
//     closeModalWindow(event.target);
//   }
// });

previewImageModalCloseButton.addEventListener("click", () =>
  closeModalWindow(previewImageModalWindow)
);

function openModalWindow(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalByEscape);
}

function closeModalWindow(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

function closeModalByEscape(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModalWindow(openedModal);
  }
}

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector
  }

  _setEventListeners() {
  this._element
    .querySelector(".card__button-favorite")
    .addEventListener("click", () => this._handlelikeButton);

  this._element
    .querySelector(".card__button-delete")
    .addEventListener("click", () => this._handleDeleteCard);

  this._element
    .querySelector(".popup__preview-image")
    .addEventListener("click", () => this._handleCardImage(data));
}

_handlelikeButton() {
  this._element
    .querySelector(".card__like-button")
    .classList.toggle("card__like-button_is-active");
}

_handleDeleteCard() {
  this._element
    .querySelector(".card__button-delete")
    .remove();
}

_handleCardImage() {
  this._element
    .querySelector(".card__image")
    .classList.toggle("card__like-button_is-active");
    previewImageEl.src = data.link;
    previewImageEl.alt = `Photo of ${data.name}`;
    openModalWindow(previewImageModalWindow);
}


_getTemplate() {
  return document
    .querySelector(this._cardSelector)
    .content.querySelector(".card")
    .cloneNode(true);
}

getView() {
  this._element = this._getTemplate();

  this._element.querySelector(".card__image").style.backGroundimage = `url( ${this._link})`;
  this._element.querySelector(".card__text").textContext = this._name;

  this._setEventListeners();
}
}


export default Card;