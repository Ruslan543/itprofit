class ModalView {
  _parentElement = document.querySelector(".modal");
  _body = document.body;
  _btnModal = document.querySelector(".btn-modal");

  _scrollY;

  addHandlerBtnModal() {
    this._btnModal.addEventListener("click", () => {
      this.openModal();
    });
  }

  addHandlerModal() {
    this._parentElement.addEventListener("click", (event) => {
      const element = event.target.closest(".modal__container");
      if (element) return;

      this.closeModal();
    });
  }

  openModal() {
    this._scrollY = window.scrollY;

    this._parentElement.classList.add("active");
    this._body.classList.add("no-scroll");

    this._body.style.marginTop = `-${this._scrollY}px`;
    this._parentElement.style.marginTop = `${this._scrollY}px`;
  }

  closeModal() {
    this._parentElement.classList.remove("active");
    this._body.classList.remove("no-scroll");

    this._body.style.marginTop = "";
    this._parentElement.style.marginTop = "";

    window.scrollTo({
      top: this._scrollY,
    });
  }
}

export default new ModalView();
