class Card {
  constructor(data, cardSelector, openModalWindow) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._handleImageClick = openModalWindow;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__button-favorite")
      .addEventListener("click", () => this._handleLikeButton());

    this._element
      .querySelector(".card__button-delete")
      .addEventListener("click", () => this._handleDeleteCard());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleCardImage());
  }

  _handleLikeButton() {
    this._element
      .querySelector(".card__button-favorite")
      .classList.toggle("card__button-favorite_state_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleCardImage() {
    const modal = document.querySelector(".js-preview-popup");
    modal.querySelector(".popup__preview-image").src = this._link;
    modal.querySelector(".popup__preview-image").alt = `Photo of ${this._name}`;
    this._handleImageClick(modal);
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
    this._element.querySelector(".card__image").alt = `Photo of ${this._name}`;
    const cardText = this._element.querySelector(".card__text");
    cardText.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}

export default Card;
