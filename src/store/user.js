import api from "@/axios/api";

export default {
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
    async registration({ commit }, { name, login, password }) {
      const data = { name, login, password };
      return api
        .post("/registration", data)
        .then((response) => {
          console.log("registration", response.data);
          commit("setUserData", { name, login });

          return response.data;
        })
        .catch((error) => {
          console.log("registration error", error);
          return Promise.reject(error);
        });
    },
    async confirmEmail(_, { login, code }) {
      const data = { login, code };
      return api
        .post("/confirmEmail", data)
        .then((response) => {
          console.log("confirmEmail", response.data);
          localStorage.token = response.data.data.token;
          api.defaults.headers["X-Auth-Token"] = response.data.data.token;

          return response.data;
        })
        .catch((error) => {
          console.log("confirmEmail error", error);
          return Promise.reject(error);
        });
    },
    async validateToken() {
      return api
        .get("/validateJWT")
        .then((response) => {
          console.log("validateToken", response.data);
          return response.data;
        })
        .catch((error) => {
          console.log("validateToken error", error);
          delete localStorage.token;
          api.defaults.headers["X-Auth-Token"] = "";

          return Promise.reject(error);
        });
    },
    async login({ commit }, { login, password }) {
      const data = { login, password };
      return api
        .post("/login", data)
        .then((response) => {
          console.log("login", response.data);
          commit("setUserData", { login });
          localStorage.token = response.data.data.token;
          api.defaults.headers["X-Auth-Token"] = response.data.data.token;

          return response.data;
        })
        .catch((error) => {
          console.log("login error", error);
          return Promise.reject(error);
        });
    },
    async passwordRecovery({ commit }, { login }) {
      const data = { login };
      return api
        .post("/passwordRecovery", data)
        .then((response) => {
          console.log("passwordRecovery", response.data);
          commit("setUserData", { login });

          return response.data;
        })
        .catch((error) => {
          console.log("passwordRecovery error", error);
          return Promise.reject(error);
        });
    },
    async getUserData({ commit }) {
      return api
        .get("/user")
        .then((response) => {
          console.log("getUserData", response.data);
          commit("setUserData", {
            login: response.data.data.login,
            name: response.data.data.name,
          });

          return response.data;
        })
        .catch((error) => {
          console.log("getUserData error", error);
          return Promise.reject(error);
        });
    },
    logout({ commit }) {
      delete localStorage.token;
      api.defaults.headers["X-Auth-Token"] = "";
      commit("setUserData", {});
    },
  },
};
