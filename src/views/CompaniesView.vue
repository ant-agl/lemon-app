<template>
  <div class="header">
    <h1 class="title">Мои компании</h1>
  </div>

  <CompaniesList
    v-if="!loading"
    class="show"
    :companies="companies"
    @delete="
      deleteId = $event;
      modalDelete = true;
    "
  />

  <AppLoader v-else />

  <div class="wrap-btns">
    <AppBtn @click.prevent="modalNewCompany = true" class="shadow">
      <img src="@/assets/img/icons/plus.svg" alt="plus" />
      <span>Новая компания</span>
    </AppBtn>
  </div>

  <ModalNewCompany :active="modalNewCompany" @close="modalNewCompany = false" />
  <ModalDelete
    :active="modalDelete"
    @close="modalDelete = false"
    @delete="deleteCompany"
  >
    <p>Удалить компанию {{ companyDeleted.company_name }}?</p>
  </ModalDelete>
</template>

<script>
import CompaniesList from "@/components/CompaniesList";
import AppBtn from "@/components/AppBtn";
import ModalNewCompany from "@/components/ModalNewCompany";
import ModalDelete from "@/components/ModalDelete";
import AppLoader from "@/components/AppLoader";

import { mapGetters } from "vuex";

export default {
  components: {
    CompaniesList,
    AppBtn,
    ModalNewCompany,
    ModalDelete,
    AppLoader,
  },
  data: () => ({
    loading: true,
    modalNewCompany: false,
    modalDelete: false,
    deleteId: null,
  }),
  computed: {
    ...mapGetters(["companies"]),
    companyDeleted() {
      return this.companies.find((c) => c.company_id == this.deleteId) ?? "";
    },
  },
  methods: {
    deleteCompany() {
      this.$store.dispatch("deleteCompany", { id: this.deleteId }).then(() => {
        this.modalDelete = false;
      });
    },
  },
  async mounted() {
    if (this.companies.length == 0) await this.$store.dispatch("getCompanies");
    this.loading = false;
  },
};
</script>
