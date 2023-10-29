import { AJAX } from "./ajax.js";

class Model {
  state = {
    data: {},
    response: {},
  };

  setData(data) {
    this.state.data = data;
  }

  async sendMessage() {
    try {
      const data = await AJAX(
        `http://localhost:9090/api/registration`,
        this.state.data
      );

      this.state.response = data;
    } catch (error) {
      throw error;
    }
  }
}

export default new Model();
