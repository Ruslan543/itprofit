import { EMAIL_REGEXP } from "../config.js";
import Inputmask from "inputmask";

const inputmask = new Inputmask("+375 (99) 999-99-99");

class FormView {
  _data;

  _parentElement = document.querySelector(".form");
  _inputPhoneElement = document.querySelector(".form__input-phone");
  _btnSendElement = document.querySelector(".form__btn-send");
  _inputs = document.querySelectorAll(".form__input");

  _message = document.querySelector(".message");

  addMessage({ status, message }) {
    this._message.textContent = message;
    this._message.classList.remove("hidden");

    if (status === "success") {
      this._inputs.forEach((input) => {
        input.value = "";
      });

      this._message.classList.add("message-success");
    }

    if (status === "error") {
      this._message.classList.add("message-error");
    }

    setTimeout(() => {
      this._message.classList.remove("message-error");
      this._message.classList.remove("message-success");
      this._message.classList.add("hidden");
    }, 5000);
  }

  addHandlerInputPhone() {
    this._inputPhoneElement.addEventListener("keyup", function () {
      inputmask.mask(this);
    });
  }

  addHandlerBtnSend(handler) {
    this._btnSendElement.addEventListener("click", (event) => {
      event.preventDefault();

      this._data = {
        name: "",
        email: "",
        phone: "",
        message: "",
      };

      this._isValidateInputs();

      const isAllValueFill = !Object.values(this._data).some((value) => !value);
      if (isAllValueFill) handler(this._data);
    });
  }

  _isValidateInputs() {
    this._inputs.forEach((input) => {
      const formInputBox = input.closest(".form__input-box");
      const inputErrorMessage = formInputBox.querySelector(
        ".form__input-error-message"
      );

      inputErrorMessage?.remove();

      const { value, id } = input;

      if (!value) {
        return this._addErrorValue(input);
      }

      if (id === "phone" && !this._isPhoneValidate(value)) {
        return this._addErrorPhone(input);
      }

      if (id === "email" && !this._isEmailValidate(value)) {
        return this._addErrorEmail(input);
      }

      this._data[id] = value;
    });
  }

  _addErrorValue(input) {
    const { value, dataset } = input;

    if (!value) {
      input.insertAdjacentHTML(
        "afterend",
        this._markupError(`Заполните поле ${dataset.field}`)
      );
    }
  }

  _addErrorPhone(input) {
    input.insertAdjacentHTML(
      "afterend",
      this._markupError(`Номер телефона должен содержать 12 цифр`)
    );
  }

  _addErrorEmail(input) {
    input.insertAdjacentHTML(
      "afterend",
      this._markupError(`Введите корректный email адрес`)
    );
  }

  _markupError(message) {
    const markup = `
      <p class="form__input-error-message">${message}</p>
    `;

    return markup;
  }

  _isEmailValidate(email) {
    return EMAIL_REGEXP.test(email);
  }

  _isPhoneValidate(value) {
    const isPhone = value
      .replaceAll(" ", "")
      .split("")
      .reduce((acc, element) => (!isNaN(element) ? acc + 1 : acc), 0);

    return isPhone === 12;
  }
}

export default new FormView();
