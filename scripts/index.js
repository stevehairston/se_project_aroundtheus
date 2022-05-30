const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup");
const profileEditCloseButton = document.querySelector(".popup__button");
const profileEditForm = document.querySelector("#edit-profile-form");
const profileTitleEl = document.querySelector(".profile__title");
const profileDescriptionEl = document.querySelector(".profile__description");

const profileTitleInput = profileEditForm.querySelector(
  ".popup__input_type_title"
);
const profileDescriptionInput = document.querySelector(
  ".popup__input_type_description"
);

function closePopup() {
  profileEditPopup.classList.remove("popup__is-opened");
}

function openPopup() {
  profileEditPopup.classList.add("popup__is-opened");
}

profileEditButton.addEventListener("click", openPopup);
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileDescriptionEl.textContent;

  openPopup();
});

profileEditCloseButton.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleValue = event.target.title.value;
  const descriptionValue = event.target.description.value;

  profileTitleEl.textContent = titleValue;
  profileDescriptionEl.textContent = descriptionValue;

  closePopup();
});

let locationCard1 = {
  name: "Yosemite Valley",
  link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
};

let locationCard2 = {
  name: "Lake Louise",
  link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
};

let locationCard3 = {
  name: "Bald Mountains",
  link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
};

let locationCard4 = {
  name: "Latemar",
  link: "https://code.s3.yandex.net/web-code/latemar.jpg",
};

let locationCard5 = {
  name: "Vanoise National Park",
  link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
};

let locationCard6 = {
  name: "Lago di Braies",
  link: "https://code.s3.yandex.net/web-code/lago.jpg ",
};

let initialCards = [
  "locationCard1",
  "locationCard2",
  "locationCard3",
  "locationCard4",
  "locationCard5",
  "locationCard6",
];

function getCardElement(data) {
  let cardElement = userTemplate.querySelector("#card-tmpl").cloneNode(true);
}

for (let i = 0; i < initialCards.length; i++) {}
