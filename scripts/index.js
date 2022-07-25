const profileEditButton = document.querySelector(".profile__button-edit");
const editModalWindow = document.querySelector(".popup_type_edit");
const modalWindow = document.querySelector(".popup");
const editModalCloseButton = editModalWindow.querySelector(
  ".popup__button-edit_type_close"
);
const profileEditForm = document.querySelector(".popup__form-edit");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

const cardsListEl = document.querySelector(".cards");

const cardAddButton = document.querySelector(".profile__button-add");
const addModalButton = document.querySelector(".profile__button-add");
const addModalWindow = document.querySelector(".popup_type_add");
const cardAddCloseButton = document.querySelector(
  ".popup__button-add_type_close"
);
const addModalCloseButton = addModalWindow.querySelector(
  ".popup__button-add_type_close"
);
const cardAddForm = document.querySelector(".popup__form-add");
const cardTitlePlaceEl = document.querySelector(
  ".popup__input_type_titlePlace"
);
const cardimageLinkEl = document.querySelector(".popup__input_type_link");

const previewImageModalWindow = document.querySelector(".js-preview-popup");

const previewImageModalCloseButton = document.querySelector(
  ".popup__button-preview_type_close"
);
const previewImageEl = document.querySelector(".popup__preview-image");

const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_title"
);
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);

const cardTemplate =
  document.querySelector("#card-tmpl").content.firstElementChild;

function handleOpenEditPopup() {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
  toggleModalWindow(editModalWindow);
}

function handleOpenEditPopup() {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
  toggleModalWindow(editModalWindow);
}

function editFormSubmitHandler(event) {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;
  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;
  toggleModalWindow(editModalWindow);
}

profileEditButton.addEventListener("click", () =>
  toggleModalWindow(editModalWindow)
);

editModalCloseButton.addEventListener("click", () =>
  toggleModalWindow(editModalWindow)
);

addModalButton.addEventListener("click", () =>
  toggleModalWindow(addModalWindow)
);

addModalCloseButton.addEventListener("click", () =>
  toggleModalWindow(addModalWindow)
);

previewImageModalCloseButton.addEventListener("click", () =>
  toggleModalWindow(previewImageModalWindow)
);

profileEditForm.addEventListener("submit", editFormSubmitHandler);

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

function generateCardElement(card) {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__text").textContent = card.name;
  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.style.backgroundImage = `url(${card.link})`;

  const deleteButton = cardElement.querySelector(".card__button-delete");
  deleteButton.addEventListener("click", handleDeleteCard);
  const cardFavoriteButton = cardElement.querySelector(
    ".card__button-favorite"
  );
  cardFavoriteButton.addEventListener("click", toggleFavoriteButton);

  cardImageEl.addEventListener("click", function () {
    previewImageEl.src = card.link;
    toggleModalWindow(previewImageModalWindow);
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  const hydratedCardEl = generateCardElement(cardData);
  renderCard(hydratedCardEl, cardsListEl);
});

function renderCard(card, container) {
  container.append(card);
}

function toggleModalWindow(modal) {
  modal.classList.toggle("popup_is-opened");
}

function handleDeleteCard() {
  cardEl = event.target.closest(".card");
  cardEl.remove();
}

function toggleFavoriteButton() {
  event.target.classList.toggle("card__button-favorite_state_active");
}

cardAddForm.addEventListener("submit", cardCreateButtonHandler);

function cardCreateButtonHandler(event) {
  event.preventDefault();
  const titlePlaceValue = event.target.titlePlace.value;
  const imageLinkValue = event.target.imageLink.value;
  const cardData = { name: titlePlaceValue, link: imageLinkValue };
  const hydratedCardEl = generateCardElement(cardData);
  renderCard(hydratedCardEl, cardsListEl);
  toggleModalWindow(addModalWindow);
}
