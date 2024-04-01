<template>
  <AppModal :active="active" title="Новая компания" @close="close">
    <form @submit.prevent="sendForm" class="form">
      <AppInput
        placeholder="Название"
        v-model="title"
        class="dark-bg"
        :error="v$.title.$error"
        errorText="Поле не заполнено"
      />

      <AppBtn class="full-w">Добавить</AppBtn>
    </form>
  </AppModal>
</template>

<script>
import AppModal from "@/components/AppModal";
import AppInput from "@/components/AppInput";
import AppBtn from "@/components/AppBtn";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  emits: ["close"],
  setup() {
    return { v$: useVuelidate() };
  },
  components: { AppModal, AppInput, AppBtn },
  props: {
    active: Boolean,
  },
  data: () => ({
    title: "",
  }),
  validations() {
    return {
      title: { required },
    };
  },
  methods: {
    close() {
      setTimeout(() => {
        this.title = "";
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
        name: this.title,
      };
      console.log(data);

      this.$store.dispatch("createCompanies", data).then(() => {
        this.close();
        // при успехе открывать компанию
      });
    },
  },
};
</script>
