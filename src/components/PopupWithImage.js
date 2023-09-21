import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupSelector.querySelector('.popup__image');
    this._caption = this._popupSelector.querySelector('.popup__caption');
  }

  open(cardData) {
    super.open();
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    this._caption.textContent = cardData.name;    
    super.setEventListeners();
  }
}

export default PopupWithImage;