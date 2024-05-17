<template>
  <AppLoader v-if="loading" />

  <div v-else>
    <AppBreadcrumbs :list="listBreadcrumbs">
      {{ currentProject.name }}
    </AppBreadcrumbs>
    <div class="header">
      <h1 class="title">{{ currentProject.name }}</h1>

      <div class="header__btns">
        <ColorPicker v-model="color" />
        <IconBtn @click="modalDelete = true">
          <img src="@/assets/img/icons/trash.svg" alt="Удалить" />
        </IconBtn>
      </div>
    </div>

    <div class="content">
      <AppDropdown :list="listClients" title="Клиент" v-model="clientId" />
      <AppTextarea placeholder="Описание" v-model="desc" class="dark-bg" />

      <FilesUpload
        :files="files"
        text="Загрузить файлы"
        @upload="upload"
        @removeFile="removeFile"
      />

      <div class="content__btns">
        <AppBtn class="full-w">Сохранить</AppBtn>
      </div>
    </div>
  </div>

  <ModalDelete
    :active="modalDelete"
    @close="modalDelete = false"
    @delete="deleteProject"
  >
    <p>Удалить проект?</p>
  </ModalDelete>
</template>

<script>
import AppBreadcrumbs from "@/components/AppBreadcrumbs";
import AppLoader from "@/components/AppLoader";
import IconBtn from "@/components/IconBtn";
import ColorPicker from "@/components/ColorPicker";
import AppTextarea from "@/components/AppTextarea";
import AppDropdown from "@/components/AppDropdown";
import AppBtn from "@/components/AppBtn";
import FilesUpload from "@/components/FilesUpload";
import ModalDelete from "@/components/ModalDelete";

import { mapGetters } from "vuex";

export default {
  components: {
    AppBreadcrumbs,
    AppLoader,
    IconBtn,
    ColorPicker,
    AppTextarea,
    AppDropdown,
    AppBtn,
    FilesUpload,
    ModalDelete,
  },
  data: () => ({
    loading: true,
    listBreadcrumbs: [],
    color: "#F5F856",
    clientId: -1,
    desc: "",
    files: [],
    modalDelete: false,
  }),
  computed: {
    ...mapGetters(["companies", "projects", "clients"]),
    currentCompany() {
      return this.companies.find(
        (c) => c.company_id == this.$route.params.companyId
      );
    },
    currentProjects() {
      return this.projects[this.currentCompany.company_id];
    },
    currentProject() {
      return this.currentProjects.find(
        (p) => p.id == this.$route.params.projectId
      );
    },
    currentClients() {
      return this.clients[this.$route.params.companyId];
    },
    listClients() {
      const list = [{ id: -1, label: "Нет" }];
      list.push(
        ...this.currentClients.map((c) => ({ id: c.id, label: c.name }))
      );
      return list;
    },
  },
  methods: {
    setData() {
      this.color = this.currentProject.color;
      this.clientId = this.currentProject.client_id;
      this.desc = this.currentProject.desc;
      this.files = this.currentProject.files;
    },
    upload(files) {
      this.files.push(...files);
    },
    removeFile(idx) {
      this.files.splice(idx, 1);
    },
    deleteProject() {
      console.log("Delete ", this.currentProject.id);
      this.$router.replace("/companies/" + this.currentCompany.company_id);
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

    this.setData();
  },
};
</script>

<style lang="scss" scoped>
.content {
  background-color: var(--dark-color-2);
  border-radius: 20px;
  padding: 40px;
  width: 500px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__btns {
    text-align: right;
  }
}
</style>
