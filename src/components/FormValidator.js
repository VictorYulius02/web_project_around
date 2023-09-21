class FormValidator {
  constructor(form, input) {
    this._form = form;
    this._input = input;
    this._error = this._form.querySelector(`.${this._input.id}-error`);
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._button = this._form.querySelector('.popup__save-button_inactive');
  }

  _showInputError(errMsg) {
    this._input.classList.add("popup__input_type-error");
    this._error.textContent = errMsg;
    this._error.classList.add("popup__input-error_active");
  }

  _hideInputError() {
    this._input.classList.remove("popup__input_type-error");
    this._error.classList.remove("popup__input-error_active");
    this._error.textContent = "";
  };

  _checkInputValid() {
    if (!this._input.validity.valid) {
      this._showInputError(this._input.validationMessage);
    } else {
      this._hideInputError();
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add("popup__save-button_inactive");
      this._button.setAttribute('disabled', 'disabled');
    } else {
      this._button.classList.remove("popup__save-button_inactive");
      this._button.removeAttribute('disabled');
    }
  };

  _setEventListeners() {

    this._toggleButtonState();
  
    this._input.addEventListener("input" , () => {
      this._checkInputValid();
      this._toggleButtonState();
    });  
  };

  enableValidation() {
      this._form.addEventListener("submit" , (evt) => {
        evt.preventDefault();
      });
  
      this._setEventListeners();
  
    };
}

export default FormValidator;