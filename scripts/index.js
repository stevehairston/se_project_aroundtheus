const profileEditButton = document.querySelector(".profile__button-edit");
const editProfileModal = document.querySelector(".popup_type_edit");
const modalWindow = document.querySelector(".popup");
const editModalCloseButton = editProfileModal.querySelector(
  ".popup__button-edit-close"
);
const profileEditForm = document.querySelector(".popup__form-edit");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

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

const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_title"
);
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);

const cardTemplate =
  document.querySelector("#card-tmpl").content.firstElementChild;

function fillProfileForm() {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
  openModalWindow(editProfileModal);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;
  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;
  closeModalWindow(editProfileModal);
}

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
});

editModalCloseButton.addEventListener("click", () =>
  closeModalWindow(editProfileModal)
);

addModalButton.addEventListener("click", () => openModalWindow(addModalWindow));

addModalCloseButton.addEventListener("click", () =>
  closeModalWindow(addModalWindow)
);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModalWindow(addModalWindow);
    closeModalWindow(editProfileModal);
  }
});

document.addEventListener("click", function (event) {
  if (event.target == addModalWindow || event.target == editProfileModal) {
    closeModalWindow(addModalWindow);
    closeModalWindow(editProfileModal);
  }
});

previewImageModalCloseButton.addEventListener("click", () =>
  closeModalWindow(previewImageModalWindow)
);

profileEditForm.addEventListener("submit", handleEditFormSubmit);

function openModalWindow(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModalWindow(modal) {
  modal.classList.remove("popup_is-opened");
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
    previewImageEl.alt = `Photo of ${card.name}`;
    openModalWindow(previewImageModalWindow);
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

function handleDeleteCard() {
  cardEl = event.target.closest(".card");
  cardEl.remove();
}

function toggleFavoriteButton() {
  event.target.classList.toggle("card__button-favorite_state_active");
}

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
}
