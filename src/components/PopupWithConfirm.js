import Popup from './Popup.js';

class PopupWithConfirm extends Popup {
  constructor(popupSelector , handleFormConfirm , processButtonText) {
    super(popupSelector);
    this._handleFormSubmit = handleFormConfirm;
    this._confirmButton = this._popupSelector.querySelector('button[name="confirmPopupSaveButton"]');
    this._processButtonText = processButtonText;
  }

  open(card, target) {
    super.open();
    this._confirmButton.textContent = "Ya";
    this._target = target;
    this._card = card;
  }

  setButtonText(text) {
    this._confirmButton.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit' , (evt) => {
      this._confirmButton.textContent = this._processButtonText;
      this._handleFormSubmit(this._card , this._target);
      evt.preventDefault();
      this.close();
    })
  }
}

export default PopupWithConfirm;