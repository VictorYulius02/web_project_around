import Popup from "./Popup.js";

class PopupWithForms extends Popup {
  constructor(popupSelector , formSubmitData , processButtonText) {
    super(popupSelector);
    this._formSubmitData = formSubmitData;
    this._formElement = this._popupSelector.querySelector('.popup__form');
    this._processButtonText = processButtonText;
    this._button = this._popupSelector.querySelector(".popup__save-button")
  }

  _getInputValues() {
    const inputs = this._formElement.querySelectorAll('.popup__input');

    const inputValues = {};

    inputs.forEach(input => {
      inputValues[input.name] = input.value;
    })

    return inputValues;
  }

  setButtonText(text) {
    this._button.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener('submit' , (event) => {
      event.preventDefault();

      const formInputValues = this._getInputValues();
      
      this._button.textContent = this._processButtonText;
      this._formSubmitData(formInputValues);
    })
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}

export default PopupWithForms;