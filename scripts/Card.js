class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__button-favorite")
      .addEventListener("click", () => this._handlelikeButton());

    this._element
      .querySelector(".card__button-delete")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleCardImage(data));
  }

  _handlelikeButton() {
    this._element
      .querySelector(".card__button-favorite")
      .classList.toggle("card__button-favorite_state_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleCardImage(data) {
    this._element
      .querySelector(".card__image")
      .classList.toggle("card__like-button_is-active");
    previewImageEl.src = data._link;
    previewImageEl.alt = `Photo of ${data._name}`;
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
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__text").textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
