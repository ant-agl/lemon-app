<template>
  <AppBreadcrumbs :list="listBreadcrumbs">Команда</AppBreadcrumbs>
  <div class="header">
    <h1 class="title">Команда</h1>
  </div>

  <AppLoader v-if="loading" />

  <TeamList
    v-else
    :team="currentTeam"
    @delete="
      employeeSelect = $event;
      modalDelete = true;
    "
    @edit="
      employeeSelect = $event;
      modalEmployee = true;
    "
  />

  <div class="wrap-btns">
    <AppBtn @click.prevent="modalEmployee = true" class="shadow">
      <img src="@/assets/img/icons/plus.svg" alt="plus" />
      <span>Добавить участника</span>
    </AppBtn>
  </div>

  <ModalEmployee
    :active="modalEmployee"
    :employee="employeeSelect"
    @close="closeModalEmployee"
  />

  <ModalDelete
    :active="modalDelete"
    @close="modalDelete = false"
    @delete="deleteEmployee"
  >
    <p>Удалить {{ employeeSelect.name }} из команды?</p>
  </ModalDelete>
</template>

<script>
import AppBreadcrumbs from "@/components/AppBreadcrumbs";
import AppLoader from "@/components/AppLoader";
import TeamList from "@/components/TeamList";
import ModalDelete from "@/components/ModalDelete";
import AppBtn from "@/components/AppBtn";
import ModalEmployee from "@/components/ModalEmployee";

import { mapGetters } from "vuex";

export default {
  components: {
    AppBreadcrumbs,
    AppLoader,
    TeamList,
    ModalDelete,
    AppBtn,
    ModalEmployee,
  },
  data() {
    return {
      loading: true,
      modalDelete: false,
      modalEmployee: false,
      employeeSelect: false,
      listBreadcrumbs: [],
    };
  },
  computed: {
    ...mapGetters(["companies", "teams"]),
    currentCompany() {
      return this.companies.find(
        (c) => c.company_id == this.$route.params.companyId
      );
    },
    currentTeam() {
      if (!this.currentCompany) return [];
      return this.teams[this.currentCompany.company_id];
    },
  },
  methods: {
    deleteEmployee() {
      console.log("Delete", this.employeeSelect.id);
      this.modalDelete = false;
    },
    closeModalEmployee() {
      setTimeout(() => {
        this.employeeSelect = false;
      }, 200);
      this.modalEmployee = false;
    },
  },
  async mounted() {
    if (this.companies.length == 0) await this.$store.dispatch("getCompanies");
    this.loading = false;

    this.listBreadcrumbs = [
      { label: "Все компании", link: "/companies" },
      {
        label: this.currentCompany.company_name,
        link: "/companies/" + this.currentCompany.company_id,
      },
    ];
  },
};
</script>
