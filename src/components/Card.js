class Card {
  constructor(
    { data, handleImageClick, handleDeleteClick, handleLikeClick },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
    // this._likeButton = document.querySelector(".card__button-favorite");
    this._userProfileId = document.querySelector(".profile__title").getAttribute("id");
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__button-favorite")
      .addEventListener("click", () => this.handleLikeClick());

    this._element
      .querySelector(".card__button-delete")
      .addEventListener("click", () => this.handleDeleteClick());

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
    this._element.setAttribute("id", this._cardId);
    this._setEventListeners();
    this._updateLikesView();
    this._cardDisplayBinIcon();

    return this._element;
  }

  setLikesInfo(data) {
    this._likes = data.likes
    this._updateLikesView();
  }

  _updateLikesView() {
    const likesCounter = this._element.querySelector(".card__favorite-counter");
    const likeTotal = this._likes.length;
    likesCounter.textContent = likeTotal;
    const favButton = this._element.querySelector(".card__button-favorite");
    console.log(typeof this._userProfileId)
    // favButton.classList.add("card__button-favorite_state_active");
    // const checkValue = this._likes.includes(`{_id: "${this._userProfileId}"}`)
    // console.log(this._likes._id.this._userProfileId)
    if (this._isLiked) {
      // this._element
      // .querySelector(".card__button-favorite")

      // favButton.classList.add("card__button-favorite_state_active");
      console.log("Got it");
    }
  }

  isLiked() {
    return Boolean(this._likes.find((item) => item._id === this._userProfileId))
  }

  _cardDisplayBinIcon() {
    const deleteButton = this._element.querySelector(".card__button-delete");
    if (this._cardOwnerId == this._userProfileId) {
      deleteButton.classList.remove("card__button-delete_hide");
    }
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;
