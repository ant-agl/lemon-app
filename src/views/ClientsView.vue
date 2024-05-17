<template>
  <AppBreadcrumbs :list="listBreadcrumbs">Клиенты</AppBreadcrumbs>
  <div class="header">
    <h1 class="title">Клиенты</h1>
  </div>

  <AppLoader v-if="loading" />

  <div v-else-if="currentClients.length > 0">
    <ClientsList
      :clients="currentClients"
      @delete="
        clientSelect = $event;
        modalDelete = true;
      "
      @edit="
        clientSelect = $event;
        modalClient = true;
      "
    />
    <div class="wrap-btns">
      <AppBtn @click.prevent="modalClient = true" class="shadow">
        <img src="@/assets/img/icons/plus.svg" alt="plus" />
        <span>Добавить клиента</span>
      </AppBtn>
    </div>
  </div>

  <ZeroElements v-else @create="modalClient = true">
    У вас пока нет клиентов
  </ZeroElements>

  <ModalClient
    :active="modalClient"
    :client="clientSelect"
    @close="closeModalClient"
  />

  <ModalDelete
    :active="modalDelete"
    @close="modalDelete = false"
    @delete="deleteClient"
  >
    <p>Удалить клиента?</p>
  </ModalDelete>
</template>

<script>
import AppBreadcrumbs from "@/components/AppBreadcrumbs";
import AppLoader from "@/components/AppLoader";
import ZeroElements from "@/components/ZeroElements";
import ModalClient from "@/components/ModalClient";
import ClientsList from "@/components/ClientsList";
import ModalDelete from "@/components/ModalDelete";
import AppBtn from "@/components/AppBtn";

import { mapGetters } from "vuex";

export default {
  components: {
    AppBreadcrumbs,
    AppLoader,
    ZeroElements,
    ModalClient,
    ClientsList,
    ModalDelete,
    AppBtn,
  },
  data() {
    return {
      loading: true,
      listBreadcrumbs: [],
      modalClient: false,
      clientSelect: false,
      modalDelete: false,
    };
  },
  computed: {
    ...mapGetters(["companies", "clients"]),
    currentCompany() {
      return this.companies.find(
        (c) => c.company_id == this.$route.params.companyId
      );
    },
    currentClients() {
      if (!this.currentCompany) return [];
      return this.clients[this.currentCompany.company_id];
    },
  },
  methods: {
    deleteClient() {
      console.log("Delete", this.clientSelect.id);
      this.modalDelete = false;
    },
    closeModalClient() {
      setTimeout(() => {
        this.clientSelect = false;
      }, 200);
      this.modalClient = false;
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
