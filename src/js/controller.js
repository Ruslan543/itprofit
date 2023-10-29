// import "../css/styles.css";
import "../sass/main.scss";

import model from "./model.js";
import formView from "./view/FormView.js";
import modalView from "./view/ModalView";

async function controlForm(data) {
  model.setData(data);
  await model.sendMessage();

  formView.addMessage(model.state.response);
}

function init() {
  formView.addHandlerInputPhone();
  formView.addHandlerBtnSend(controlForm);
  modalView.addHandlerBtnModal();
  modalView.addHandlerModal();
}

init();
