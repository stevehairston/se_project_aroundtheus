class Card {
  constructor(
    { data, userId, handleImageClick, handleDeleteClick, handleLikeClick },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._userId = userId;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this.handleLikeClick());

    this._element
      .querySelector(".card__button-delete")
      .addEventListener("click", () => this.handleDeleteClick());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick(this._link, this._name)
      );
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
    this._likeButton = this._element.querySelector(".card__button-favorite");
    this._element.setAttribute("id", this._cardId);
    this._likesCounter = this._element.querySelector(".card__favorite-counter");

    this._renderLikes();
    this._setEventListeners();
    this._cardDisplayBinIcon();

    return this._element;
  }

  _cardDisplayBinIcon() {
    const deleteButton = this._element.querySelector(".card__button-delete");
    if (this._cardOwnerId == this._userId) {
      deleteButton.classList.remove("card__button-delete_hide");
    }
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _handleLikeButton() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__button-favorite_state_active");
    } else {
      this._likeButton.classList.remove("card__button-favorite_state_active");
    }
  }

  _updateLikeCount() {
    const likeTotal = this._likes.length;
    this._likesCounter.textContent = likeTotal;
  }

  _renderLikes() {
    this._handleLikeButton();
    this._updateLikeCount();
  }

  updateLikes(likes) {
    this._likes = likes;
    this._renderLikes();
  }
}

export default Card;
