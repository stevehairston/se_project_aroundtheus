const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup");
const profileEditCloseButton = document.querySelector(".popup__button-close");
const profileEditForm = document.querySelector(".popup__form");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

const cardsListEl = document.querySelector(".cards");

const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_title"
);
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);

// Card Template
const cardTemplate =
  document.querySelector("#card-tmpl").content.firstElementChild;

function closePopup() {
  profileEditPopup.classList.remove("popup_is-opened");
}

function openPopup() {
  profileEditPopup.classList.add("popup_is-opened");
}

function handleOpenEditPopup() {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;
  openPopup();
}

function handleProfileSubmit(event) {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;

  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;

  closePopup();
}

profileEditButton.addEventListener("click", handleOpenEditPopup);

profileEditCloseButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileSubmit);

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

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__text").textContent = data.name;
  return cardElement;
}

initialCards.forEach((cardData) => {
  const hydratedCardEl = getCardElement(cardData);
  cardsListEl.append(hydratedCardEl);
});
