import { createStore } from "vuex";
import user from "./user";
import sidebar from "./sidebar";
import companies from "./companies";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { user, sidebar, companies },
});
