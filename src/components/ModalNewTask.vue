<template>
  <AppModal :active="active" title="Новая задача" @close="close" class="middle">
    <form @submit.prevent="sendForm" class="form">
      <AppInput
        placeholder="Название"
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
        id="deadline"
        class="dark-bg"
        v-model="deadline"
        :error="v$.deadline.$error"
        errorText="Дата в формате ДД.ММ.ГГГГ"
      />

      <div class="modal__row">
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

      <AppBtn class="full-w">Добавить</AppBtn>
    </form>
  </AppModal>
</template>

<script>
import AppModal from "@/components/AppModal";
import AppInput from "@/components/AppInput";
import AppTextarea from "@/components/AppTextarea";
import AppDropdown from "@/components/AppDropdown";
import AppBtn from "@/components/AppBtn";
import FilesUpload from "@/components/FilesUpload";

import { useVuelidate } from "@vuelidate/core";
import { numeric, required } from "@vuelidate/validators";
import { dateValidate } from "@/validators";

import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

import { mapGetters } from "vuex";

export default {
  emits: ["close"],
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    AppModal,
    AppInput,
    AppTextarea,
    AppDropdown,
    AppBtn,
    FilesUpload,
  },
  props: {
    active: Boolean,
  },
  data: () => ({
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
    datepicker: false,
  }),
  computed: {
    ...mapGetters(["clients", "statusList", "prioritiesList", "teams"]),
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
    upload(files) {
      this.files.push(...files);
    },
    removeFile(idx) {
      this.files.splice(idx, 1);
    },
    close() {
      setTimeout(() => {
        this.title = "";
        this.statusId = 0;
        this.priorityId = 1;
        this.responsibleId = -1;
        this.deadline = "";
        this.plan = "";
        this.fact = "";
        this.budget = "";
        this.desc = "";
        this.files = [];

        this.v$.$reset();
      }, 300);

      this.$emit("close");
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

      this.close();
      // this.$store.dispatch("createCompanies", data).then(() => {
      // this.close();
      // при успехе открывать проект
      // });
    },
  },
  async mounted() {
    this.datepicker = new AirDatepicker("#deadline input", {
      autoClose: true,
      onSelect: ({ formattedDate }) => {
        this.deadline = formattedDate;
      },
    });
  },
  unmounted() {
    if (this.datepicker) this.datepicker.destroy();
  },
};
</script>

<style scoped>
.modal__row {
  align-items: flex-start;
}
</style>
