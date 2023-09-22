class Card {
  constructor(cardData , cardSelector , handleCardClick, handleDeleteClick, handleLikeClick, userId) {
    this._title = cardData.name;
    this._url = cardData.link;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = cardData.likes;
    if (this._likes === undefined) {
      this._likes = [];
    }
    this._handleLikeClick = handleLikeClick;
    this._id = cardData._id;
    this._userId = userId;
    this._ownerId = cardData.owner._id;
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._likes.some((user) => user._id === this._userId);
  }

  handleLikeCard = (newLikes) => {
    this._likes = newLikes;
    this._renderLikes();
  };

  _renderLikes() {
    this._likesCount.textContent = this._likes.length;
    if (this.isLiked()) {
      this._cardLikeButton.classList.add("element__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("element__like-button_active");
    }
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    this._cardDeleteButton = this._cardElement.querySelector(".element__delete");
    this._cardLikeButton = this._cardElement.querySelector(".element__like-button");
    this._setEventListeners();
    
    this._likesCount = this._cardElement.querySelector(".element__like-count");
    this._renderLikes();

    if (this._ownerId !== this._userId) {
      this._cardDeleteButton.style.visibility = "hidden";
    }

    return this._cardElement;
  }

  _setEventListeners() {
    const cardImage = this._cardElement.querySelector('.element__image');
    const cardLocation = this._cardElement.querySelector('.element__location');
    const cardData = {
      name: this._title,
      link: this._url,
      _id: this._id
    };

    cardImage.src = this._url;
    cardImage.alt = this._title;
    cardLocation.textContent = this._title;

    cardImage.addEventListener('click' , () => {
      this._handleCardClick(cardData);
    })

    this._cardLikeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    });

    this._cardDeleteButton.addEventListener('click', (event) => {
      this._handleDeleteClick(cardData, event.target.closest(".element"));
    });

    return this._element;
  }
}

export default Card;