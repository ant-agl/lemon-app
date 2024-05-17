<template>
  <AppLoader v-if="loading || !currentCompany" />

  <div v-else>
    <AppBreadcrumbs :list="listBreadcrumbs">
      {{ currentProject.name }}
    </AppBreadcrumbs>
    <div class="header">
      <h1 class="title">Список задач</h1>
    </div>

    <div v-if="currentTasks.length > 0">
      <TasksList
        :tasks="currentTasks"
        @delete="
          tasksSelect = $event;
          modalDelete = true;
        "
      />

      <div class="wrap-btns">
        <AppBtn class="shadow" @click.prevent="modalNewTask = true">
          <img src="@/assets/img/icons/plus.svg" alt="plus" />
          <span>Добавить задачу</span>
        </AppBtn>
      </div>
    </div>
    <ZeroElements v-else @create="modalNewTask = true">
      Задач пока нет
    </ZeroElements>
  </div>

  <ModalDelete
    :active="modalDelete"
    @close="modalDelete = false"
    @delete="deleteCompany"
  >
    <p>Удалить задачу?</p>
  </ModalDelete>

  <ModalNewTask :active="modalNewTask" @close="modalNewTask = false" />
</template>

<script>
import AppBreadcrumbs from "@/components/AppBreadcrumbs";
import AppLoader from "@/components/AppLoader";
import ModalDelete from "@/components/ModalDelete";
import ZeroElements from "@/components/ZeroElements";
import TasksList from "@/components/TasksList";
import AppBtn from "@/components/AppBtn";
import ModalNewTask from "@/components/ModalNewTask";

import { mapGetters } from "vuex";

export default {
  components: {
    AppBreadcrumbs,
    AppLoader,
    ModalDelete,
    ZeroElements,
    TasksList,
    AppBtn,
    ModalNewTask,
  },
  data: () => ({
    loading: true,
    listBreadcrumbs: [],
    modalDelete: false,
    tasksSelect: false,
    modalNewTask: false,
  }),
  computed: {
    ...mapGetters(["companies", "projects", "tasks", "clients"]),
    currentCompany() {
      return this.companies.find(
        (c) => c.company_id == this.$route.params.companyId
      );
    },
    currentProjects() {
      if (!this.currentCompany) return [];
      return this.projects[this.currentCompany.company_id];
    },
    currentProject() {
      return this.currentProjects.find(
        (p) => p.id == this.$route.params.projectId
      );
    },
    currentTasks() {
      return this.tasks.filter(
        (t) => t.project_id == this.$route.params.projectId
      );
    },
    currentClients() {
      return this.clients[this.$route.params.companyId];
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
    if (this.currentProject === undefined) this.$router.replace("/404");

    this.listBreadcrumbs = [
      { label: "Все компании", link: "/companies" },
      {
        label: this.currentCompany.company_name,
        link: "/companies/" + this.currentCompany.company_id,
      },
    ];

    console.log(this.currentTasks);
  },
};
</script>
