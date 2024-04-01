import api from "@/axios/api";

export default {
  state: {
    companies: [],
  },
  getters: {
    companies: (s) => s.companies,
  },
  mutations: {
    setCompanies(s, companies) {
      s.companies = companies;
    },
    addCompany(s, company) {
      s.companies.push(company);
    },
    deleteCompany(s, id) {
      const idx = s.companies.findIndex((c) => c.company_id == id);
      s.companies.splice(idx, 1);
    },
  },
  actions: {
    async getCompanies({ commit }) {
      return api
        .get("/company")
        .then((response) => {
          console.log("getCompanies", response.data);
          commit("setCompanies", response.data.data);

          return response.data;
        })
        .catch((error) => {
          console.log("getCompanies error", error);
          return Promise.reject(error);
        });
    },
    async createCompanies({ commit }, { name }) {
      return api
        .post("/company", { name })
        .then((response) => {
          console.log("createCompanies", response.data);
          commit("addCompany", {
            company_id: new Date().getTime(),
            name,
            role: "Владелец",
          });

          return response.data;
        })
        .catch((error) => {
          console.log("createCompanies error", error);
          return Promise.reject(error);
        });
    },
    async deleteCompany({ commit }, { id }) {
      console.log(id);
      return api
        .delete("/company/" + id)
        .then((response) => {
          console.log("deleteCompany", response.data);
          commit("deleteCompany", id);

          return response.data;
        })
        .catch((error) => {
          console.log("deleteCompany error", error);
          return Promise.reject(error);
        });
    },
  },
};
