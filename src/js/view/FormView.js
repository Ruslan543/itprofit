import { EMAIL_REGEXP } from "../config.js";
import Inputmask from "inputmask";

const inputmask = new Inputmask("+375 (99) 999-99-99");

class FormView {
  _parentElement = document.querySelector(".form");
  _inputPhoneElement = document.querySelector(".form__input-phone");
  _btnSendElement = document.querySelector(".form__btn-send");
  _inputs = document.querySelectorAll(".form__input");

  _message = document.querySelector(".message");

  addMessage({ status, message }) {
    if (status === "success") {
      this._inputs.forEach((input) => {
        input.value = "";
      });

      this._message.textContent = message;
      this._message.classList.remove("hidden");
      this._message.classList.add("message-success");
    }

    if (status === "error") {
      this._message.textContent = message;
      this._message.classList.remove("hidden");
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

      const data = {
        name: "",
        email: "",
        phone: "",
        message: "",
      };

      this._inputs.forEach((input) => {
        const formInputBox = input.closest(".form__input-box");
        const inputErrorMessage = formInputBox.querySelector(
          ".form__input-error-message"
        );
        inputErrorMessage?.remove();

        const { value, dataset, id } = input;

        if (!value) {
          input.insertAdjacentHTML(
            "afterend",
            this._markupError(`Заполните поле ${dataset.field}`)
          );

          return;
        }

        if (id === "phone") {
          const countNumbers = value
            .replaceAll(" ", "")
            .split("")
            .reduce((acc, element) => (!isNaN(element) ? acc + 1 : acc), 0);

          if (countNumbers !== 12) {
            input.insertAdjacentHTML(
              "afterend",
              this._markupError(`Длина поля должна быть 12 цифр`)
            );

            return;
          }
        }

        if (id === "email" && !this._isEmailValidate(value)) {
          input.insertAdjacentHTML(
            "afterend",
            this._markupError(`Введите корректный email адрес`)
          );

          return;
        }

        data[id] = value;
      });

      const isAllValueFill = !Object.values(data).some((value) => !value);

      if (isAllValueFill) handler(data);
    });
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
}

export default new FormView();
