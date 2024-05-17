<template>
  <AppLoader v-if="loading || !currentCompany" />

  <div v-else>
    <AppBreadcrumbs :list="listBreadcrumbs">{{
      currentCompany.company_name
    }}</AppBreadcrumbs>
    <div class="header">
      <h1 class="title">{{ currentCompany.company_name }}</h1>

      <div class="header__btns">
        <router-link :to="`/companies/${currentCompany.company_id}/clients`">
          <IconBtn>
            <img src="@/assets/img/icons/clients.svg" alt="Клиенты" />
          </IconBtn>
        </router-link>
        <router-link :to="`/companies/${currentCompany.company_id}/team`">
          <IconBtn>
            <img src="@/assets/img/icons/users.svg" alt="Команда" />
          </IconBtn>
        </router-link>
        <IconBtn @click="modalDelete = true">
          <img src="@/assets/img/icons/trash.svg" alt="Удалить" />
        </IconBtn>
      </div>
    </div>

    <div v-if="currentProjects.length > 0">
      <ProjectsList
        :projects="currentProjects"
        @delete="
          projectSelect = $event;
          modalDeleteProject = true;
        "
      />

      <div class="wrap-btns">
        <AppBtn class="shadow" @click.prevent="modalNewProject = true">
          <img src="@/assets/img/icons/plus.svg" alt="plus" />
          <span>Добавить проект</span>
        </AppBtn>
      </div>
    </div>
    <ZeroElements v-else @create="modalNewProject = true">
      У вас пока нет проектов
    </ZeroElements>
  </div>

  <ModalDelete
    :active="modalDelete"
    @close="modalDelete = false"
    @delete="deleteCompany"
  >
    <p>Удалить компанию?</p>
  </ModalDelete>

  <ModalDelete
    :active="modalDeleteProject"
    @close="modalDeleteProject = false"
    @delete="deleteProject"
  >
    <p>Удалить проект?</p>
  </ModalDelete>

  <ModalNewProject :active="modalNewProject" @close="modalNewProject = false" />
</template>

<script>
import AppBreadcrumbs from "@/components/AppBreadcrumbs";
import AppLoader from "@/components/AppLoader";
import IconBtn from "@/components/IconBtn";
import ModalDelete from "@/components/ModalDelete";
import ZeroElements from "@/components/ZeroElements";
import ProjectsList from "@/components/ProjectsList";
import AppBtn from "@/components/AppBtn";
import ModalNewProject from "@/components/ModalNewProject";

import { mapGetters } from "vuex";

export default {
  components: {
    AppBreadcrumbs,
    IconBtn,
    AppLoader,
    ModalDelete,
    ZeroElements,
    ProjectsList,
    AppBtn,
    ModalNewProject,
  },
  data: () => ({
    loading: true,
    listBreadcrumbs: [{ label: "Все компании", link: "/companies" }],
    modalDelete: false,
    modalDeleteProject: false,
    projectSelect: false,
    modalNewProject: false,
  }),
  computed: {
    ...mapGetters(["companies", "projects"]),
    currentCompany() {
      return this.companies.find(
        (c) => c.company_id == this.$route.params.companyId
      );
    },
    currentProjects() {
      if (!this.currentCompany) return [];
      return this.projects[this.currentCompany.company_id];
    },
  },
  methods: {
    deleteCompany() {
      this.$router.replace("/companies");
      // this.$store.dispatch("deleteCompany", { id: this.deleteId }).then(() => {
      //   this.modalDelete = false;
      // });
    },
    deleteProject() {
      console.log("Delete ", this.projectSelect.id);
      this.modalDeleteProject = false;
    },
  },
  async mounted() {
    if (this.companies.length == 0) await this.$store.dispatch("getCompanies");
    this.loading = false;

    if (this.currentCompany === undefined) this.$router.replace("/404");
  },
};
</script>
