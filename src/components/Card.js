class Card {
  constructor({ data, handleImageClick}, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    // this._confirmDeletePopup = confirmDeletePopup; confirmDeletePopup

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._likeButton = document.querySelector(".card__button-favorite");
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__button-favorite")
      .addEventListener("click", () => this._handleLikeButton());

    // this._element
    //   .querySelector(".card__button-delete")
    //   .addEventListener("click", () => this._confirmDeletePopup());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick(this._link, this._name)
      );
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

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    const imageElement = this._element.querySelector(".card__image");
    imageElement.src = this._link;
    imageElement.alt = `Photo of ${this._name}`;
    const cardText = this._element.querySelector(".card__text");
    cardText.textContent = this._name;
    this._setEventListeners();
    this._setLikesInfo()
    return this._element;
  }

  _setLikesInfo() {
    const likesCounter = this._element.querySelector(".card__favorite-counter");
    const likeTotal = this._likes.length;
    likesCounter.textContent = likeTotal;
  }
}

export default Card;
