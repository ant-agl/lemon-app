<template>
  <AppModal :active="active" title="Новый проект" @close="close">
    <form @submit.prevent="sendForm" class="form">
      <AppInput
        placeholder="Название"
        v-model="title"
        class="dark-bg"
        :error="v$.title.$error"
        errorText="Поле не заполнено"
      />

      <div class="modal__row">
        <AppDropdown :list="listClients" title="Клиент" v-model="clientId" />
        <ColorPicker v-model="color" />
      </div>

      <AppTextarea placeholder="Описание" v-model="desc" class="dark-bg" />

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
import ColorPicker from "@/components/ColorPicker";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

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
    ColorPicker,
  },
  props: {
    active: Boolean,
  },
  data: () => ({
    title: "",
    desc: "",
    clientId: -1,
    files: [],
    color: "#F5F856",
  }),
  computed: {
    ...mapGetters(["clients"]),
    currentClients() {
      debugger;
      return this.clients[this.$route.params.companyId];
    },
    listClients() {
      const list = [{ id: -1, label: "Нет" }];
      debugger;
      list.push(
        ...this.currentClients.map((c) => ({ id: c.id, label: c.name }))
      );
      return list;
    },
  },
  validations: () => ({
    title: { required },
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
};
</script>
