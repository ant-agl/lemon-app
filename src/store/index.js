import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    userData: {},
  },
  getters: {
    userData: (state) => state.userData,
  },
  mutations: {
    setUserData(state, userData) {
      state.userData = userData;
    },
  },
  actions: {
    confirmEmail(context, payload) {
      return axios.post("https://api.lemon-time.ru/confirmEmail", payload);
    },
  },
  modules: {},
});
