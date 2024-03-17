<template>
  <form @submit.prevent="sendForm">
    <div class="auth-header">
      <p class="title">Вход</p>
      <p class="subtitle">Войдите, чтобы продолжить</p>
    </div>

    <div class="icon-container">
      <a href="#">
        <IconGoogle />
      </a>
      <a href="#">
        <IconYandex />
      </a>
      <a href="#">
        <IconVk />
      </a>
    </div>
    <div class="information-container">
      <div class="fields-container">
        <AppInput
          placeholder="E-mail"
          type="text"
          :icon="require('@/assets/icons/emailicon.svg')"
          :error="v$.email.$error"
          :errorText="errorEmail"
          v-model="email"
        />
        <AppInput
          placeholder="Пароль"
          type="password"
          :icon="require('@/assets/icons/password.svg')"
          :error="v$.password.$error"
          :errorText="errorPassword"
          v-model="password"
        />
      </div>

      <p class="forgot-password">
        <router-link to="/forgot" class="link">Забыли пароль?</router-link>
      </p>
      <AppBtn>Войти</AppBtn>

      <p class="privacy-policy-text">
        Авторизуясь, вы соглашаетесь с
        <br />
        <router-link to="/register" class="link">
          правилами обработки персональных данных</router-link
        >
      </p>
    </div>

    <p class="registration-text">
      Еще нет аккаунта?
      <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
    </p>
  </form>
</template>

<script>
import AppBtn from "@/components/AppBtn";
import AppInput from "@/components/AppInput";
import IconGoogle from "@/components/icons/IconGoogle";
import IconVk from "@/components/icons/IconVk";
import IconYandex from "@/components/icons/IconYandex";

import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    AppBtn,
    AppInput,
    IconGoogle,
    IconVk,
    IconYandex,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    errorEmail() {
      if (!this.v$.email.$error) return "";
      if (this.v$.email.required.$invalid) return "Поле не заполнено";
      if (this.v$.email.email.$invalid) return "Неверный email";
      return "Неизвестная ошибка";
    },
    errorPassword() {
      if (!this.v$.password.$error) return "";
      if (this.v$.password.required.$invalid) return "Поле не заполнено";
      if (this.v$.password.minLength.$invalid)
        return `Минимальная длина пароля ${this.v$.password.minLength.$params.min} символов`;
      return "Неизвестная ошибка";
    },
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(8) },
    };
  },
  methods: {
    sendForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      let data = {
        email: this.email,
        password: this.password,
      };
      console.log(data);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.forgot-password {
  font-weight: 600;
  color: var(--secondary-color);
  font-size: 12px;
  margin-top: -8px;
  padding-right: 14px;
  width: 100%;
  text-align: right;
}
</style>
