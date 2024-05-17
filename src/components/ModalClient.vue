<template>
  <AppModal :active="active" :title="modalTitle" @close="close">
    <form @submit.prevent="sendForm" class="form">
      <AppInput
        placeholder="Имя"
        v-model="name"
        class="dark-bg"
        :error="v$.name.$error"
        errorText="Поле не заполнено"
      />

      <AppTextarea
        placeholder="Описание и вся важная информация"
        v-model="desc"
        class="dark-bg"
      />

      <div class="form__footer">
        <AppBtn @click.prevent="close" class="cancel full-w">Отмена</AppBtn>
        <AppBtn class="full-w">{{ modalBtn }}</AppBtn>
      </div>
    </form>
  </AppModal>
</template>

<script>
import AppModal from "@/components/AppModal";
import AppInput from "@/components/AppInput";
import AppTextarea from "@/components/AppTextarea";
import AppBtn from "@/components/AppBtn";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  emits: ["close"],
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    active: Boolean,
    client: {
      type: [Object, Boolean],
      required: false,
    },
  },
  components: { AppModal, AppInput, AppTextarea, AppBtn },
  data() {
    return {
      name: "",
      desc: "",
    };
  },
  computed: {
    modalTitle() {
      return this.client ? "Редактировать клиента" : "Добавить клиента";
    },
    modalBtn() {
      return this.client ? "Сохранить" : "Добавить";
    },
  },
  watch: {
    client: {
      handler() {
        if (!this.client) return;

        this.name = this.client.name;
        this.desc = this.client.desc;
      },
      deep: true,
    },
  },
  validations() {
    return {
      name: { required },
    };
  },
  methods: {
    close() {
      setTimeout(() => {
        this.name = "";
        this.desc = "";
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
        name: this.name,
        desc: this.desc,
      };
      console.log(data);

      this.close();
      // this.$store.dispatch("createCompanies", data).then(() => {
      // при успехе открывать компанию
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.salary-block {
  &__title {
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 600;
  }
  &__row {
    display: flex;
    gap: 20px;
    justify-content: flex-start;
  }
}
</style>
