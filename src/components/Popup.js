class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_active');
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_active');
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._popupSelector.querySelector('.popup__close-button');
    const overlay = this._popupSelector.querySelector('.popup__overlay');

    closeButton.addEventListener('click' , () => this.close());
    overlay.addEventListener('click' , () => this.close());
    document.addEventListener('keydown' , (event) => this._handleEscClose(event));
  }
}

export default Popup;