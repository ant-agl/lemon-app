<template>
  <AppModal
    :active="active"
    title="Обратная связь"
    @close="close"
    class="middle"
  >
    <form @submit.prevent="sendForm" class="form">
      <AppInput
        placeholder="Тема"
        v-model="subject"
        class="dark-bg"
        :error="v$.subject.$error"
        errorText="Поле не заполнено"
      />
      <AppTextarea
        placeholder="Опишите проблему..."
        v-model="text"
        class="dark-bg"
        :error="v$.text.$error"
        errorText="Поле не заполнено"
      />

      <FilesUpload
        :files="files"
        accept="image/*"
        @upload="upload"
        @removeFile="removeFile"
      />

      <AppBtn class="full-w">Отправить</AppBtn>
    </form>
  </AppModal>
</template>

<script>
import AppModal from "@/components/AppModal";
import AppInput from "@/components/AppInput";
import AppTextarea from "@/components/AppTextarea";
import AppBtn from "@/components/AppBtn";
import FilesUpload from "@/components/FilesUpload";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import api from "@/axios/api";

export default {
  emits: ["close", "logout"],
  setup() {
    return { v$: useVuelidate() };
  },
  components: { AppModal, AppInput, AppTextarea, AppBtn, FilesUpload },
  props: {
    active: Boolean,
  },
  data: () => ({
    subject: "",
    text: "",
    files: [],
  }),
  validations() {
    return {
      subject: { required },
      text: { required },
    };
  },
  methods: {
    upload(files) {
      this.files.push(...files);
    },
    removeFile(idx) {
      this.files.splice(idx, 1);
    },
    close() {
      setTimeout(() => {
        this.subject = "";
        this.text = "";
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

      const fd = new FormData();
      fd.append("theme", this.subject);
      fd.append("text", this.text);

      for (const file of this.files) {
        fd.append("documents[]", file);
      }

      api
        .post("/callbackUser", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          this.close();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
