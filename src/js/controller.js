// import "../css/styles.css";
import "../sass/main.scss";

import model from "./model.js";
import formView from "./view/FormView.js";
import modalView from "./view/ModalView";

async function controlForm(data) {
  model.setData(data);

  formView.setBtnSendDisabled(true);
  await model.sendMessage();
  formView.setBtnSendDisabled(false);

  formView.addMessage(model.state.response);
}

function init() {
  formView.addHandlerInputPhone();
  formView.addHandlerFormSubmit(controlForm);

  modalView.addHandlerBtnModal();
  modalView.addHandlerModal();
}

init();
