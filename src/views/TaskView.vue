<template>
  <AppLoader v-if="loading" />

  <div v-else>
    <AppBreadcrumbs :list="listBreadcrumbs">
      {{ currentTask.name }}
    </AppBreadcrumbs>
    <div class="header">
      <h1 class="title">{{ currentTask.name }}</h1>

      <div class="header__btns">
        <IconBtn @click="modalDelete = true">
          <img src="@/assets/img/icons/trash.svg" alt="Удалить" />
        </IconBtn>
      </div>
    </div>

    <div class="content">
      <AppInput
        placeholder="Название"
        title="Название"
        v-model="title"
        class="dark-bg"
        :error="v$.title.$error"
        errorText="Поле не заполнено"
      />

      <AppDropdown :list="listStatus" title="Статус" v-model="statusId" />
      <AppDropdown :list="listPriority" title="Важность" v-model="priorityId" />
      <AppDropdown
        :list="listTeam"
        title="Ответсвенный"
        v-model="responsibleId"
      />

      <AppInput
        placeholder="Дедлайн"
        title="Дедлайн"
        id="task-deadline"
        class="dark-bg"
        v-model="deadline"
        :error="v$.deadline.$error"
        errorText="Дата в формате ДД.ММ.ГГГГ"
      />

      <div class="content__row">
        <AppInput
          placeholder="План"
          title="План"
          v-model="plan"
          class="dark-bg"
          :error="v$.plan.$error"
          errorText="Должно быть числом"
        />
        <AppInput
          placeholder="Факт"
          title="Факт"
          v-model="fact"
          class="dark-bg"
          :error="v$.fact.$error"
          errorText="Должно быть числом"
        />
      </div>

      <AppInput
        placeholder="Бюджет"
        title="Бюджет"
        v-model="budget"
        class="dark-bg"
        :error="v$.budget.$error"
        errorText="Должно быть числом"
      />

      <AppTextarea
        placeholder="Техническое задание"
        v-model="desc"
        class="dark-bg"
      />

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
    @delete="deleteTask"
  >
    <p>Удалить задачу?</p>
  </ModalDelete>
</template>

<script>
import AppBreadcrumbs from "@/components/AppBreadcrumbs";
import AppLoader from "@/components/AppLoader";
import IconBtn from "@/components/IconBtn";
import AppTextarea from "@/components/AppTextarea";
import AppInput from "@/components/AppInput";
import AppDropdown from "@/components/AppDropdown";
import AppBtn from "@/components/AppBtn";
import FilesUpload from "@/components/FilesUpload";
import ModalDelete from "@/components/ModalDelete";

import { useVuelidate } from "@vuelidate/core";
import { numeric, required } from "@vuelidate/validators";
import { dateValidate } from "@/validators";

import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

import { mapGetters } from "vuex";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    AppBreadcrumbs,
    AppLoader,
    IconBtn,
    AppTextarea,
    AppInput,
    AppDropdown,
    AppBtn,
    FilesUpload,
    ModalDelete,
  },
  data: () => ({
    loading: true,
    listBreadcrumbs: [],
    title: "",
    statusId: 0,
    priorityId: 1,
    responsibleId: -1,
    deadline: "",
    plan: "",
    fact: "",
    budget: "",
    desc: "",
    files: [],
    modalDelete: false,
    datepicker: false,
  }),
  computed: {
    ...mapGetters([
      "companies",
      "projects",
      "clients",
      "statusList",
      "prioritiesList",
      "teams",
      "tasks",
    ]),
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
    currentTask() {
      return this.tasks.find((t) => t.id == this.$route.params.taskId);
    },
    listStatus() {
      return [...this.statusList.map((s) => ({ id: s.id, label: s.name }))];
    },
    listPriority() {
      return [...this.prioritiesList.map((p) => ({ id: p.id, label: p.name }))];
    },
    currentTeam() {
      return this.teams[this.$route.params.companyId];
    },
    listTeam() {
      const list = [{ id: -1, label: "Нет" }];
      list.push(
        ...this.currentTeam.map((t) => {
          const item = {
            id: t.id,
            label: t.name,
          };
          if (t.role) item.label += ` (${t.role})`;

          return item;
        })
      );
      return list;
    },
  },
  validations: () => ({
    title: { required },
    plan: { numeric },
    fact: { numeric },
    budget: { numeric },
    deadline: { dateValidate },
  }),
  methods: {
    setData() {
      this.title = this.currentTask.name;
      this.statusId = this.currentTask.status;
      this.priorityId = this.currentTask.priority;
      this.responsibleId = this.currentTask.responsible_id;
      // this.deadline = this.currentTask.deadline;
      this.plan = this.currentTask.plan;
      this.fact = this.currentTask.fact;
      this.budget = this.currentTask.budget;
      this.desc = this.currentTask.desc;
      this.files = this.currentTask.files;

      this.datepicker.selectDate(new Date());
    },
    upload(files) {
      this.files.push(...files);
    },
    removeFile(idx) {
      this.files.splice(idx, 1);
    },
    sendForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      const data = {
        title: this.title,
        desc: this.desc,
        files: this.files, // need change
      };
      console.log(data);
    },
    deleteTask() {
      console.log("Delete ", this.currentTask.id);
      this.$router.replace(
        `/companies/${this.currentCompany.company_id}/${this.currentProject.id}`
      );
    },
  },
  async mounted() {
    if (this.companies.length == 0) await this.$store.dispatch("getCompanies");
    this.loading = false;

    if (
      this.currentCompany === undefined ||
      this.currentProject === undefined ||
      this.currentTask === undefined
    )
      this.$router.replace("/404");

    this.listBreadcrumbs = [
      { label: "Все компании", link: "/companies" },
      {
        label: this.currentCompany.company_name,
        link: "/companies/" + this.currentCompany.company_id,
      },
      {
        label: this.currentProject.name,
        link: `/companies/${this.currentCompany.company_id}/${this.currentProject.id}/tasks`,
      },
    ];

    setTimeout(() => {
      this.datepicker = new AirDatepicker("#task-deadline input", {
        autoClose: true,
        onSelect: ({ formattedDate }) => {
          this.deadline = formattedDate;
        },
      });

      this.setData();
    });
  },
  unmounted() {
    if (this.datepicker) this.datepicker.destroy();
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

  &__row {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }
}
</style>
