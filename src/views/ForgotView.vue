<template>
  <form @submit.prevent="sendForm">
    <div class="auth-header">
      <p class="title">Забыли пароль?</p>
      <p class="subtitle">
        Введите адрес электронной почты, на <br />который вы зарегистрировались
      </p>
    </div>

    <div class="information-container">
      <div class="fields-container">
        <AppInput
          placeholder="E-mail"
          type="text"
          :icon="require('@/assets/img/icons/emailicon.svg')"
          :error="v$.email.$error"
          :errorText="errorEmail"
          v-model="email"
        />
      </div>
      <AppBtn class="full-w">Отправить</AppBtn>
    </div>

    <AppBtnBack link="/login" />
  </form>
</template>

<script>
import AppBtn from "@/components/AppBtn";
import AppInput from "@/components/AppInput";
import AppBtnBack from "@/components/AppBtnBack";

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    AppBtn,
    AppInput,
    AppBtnBack,
  },
  data() {
    return {
      email: "",
    };
  },
  computed: {
    errorEmail() {
      if (!this.v$.email.$error) return "";
      if (this.v$.email.required.$invalid) return "Поле не заполнено";
      if (this.v$.email.email.$invalid) return "Неверный email";
      return "Неизвестная ошибка";
    },
  },
  validations() {
    return {
      email: { required, email },
    };
  },
  methods: {
    sendForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      let data = {
        login: this.email,
      };
      console.log(data);

      this.$store
        .dispatch("passwordRecovery", data)
        .then(() => {
          this.$router.push("/verify");
        })
        .catch(() => {});
    },
  },
};
</script>
