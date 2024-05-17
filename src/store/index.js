import { createStore } from "vuex";
import user from "./user";
import sidebar from "./sidebar";
import companies from "./companies";
import teams from "./teams";
import clients from "./clients";
import projects from "./projects";
import tasks from "./tasks";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    clearData({ commit }) {
      commit("setUserData", {});
      // commit("setCompanies", []);
    },
  },
  modules: { user, sidebar, companies, teams, clients, projects, tasks },
});
