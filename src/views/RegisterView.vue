<template>
  <form @submit.prevent="sendForm">
    <div class="auth-header">
      <p class="title">Регистрация</p>
      <p class="subtitle">Создайте новый аккаунт</p>
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
          placeholder="Имя и фамилия"
          type="text"
          :icon="require('@/assets/icons/name.svg')"
          :error="v$.name.$error"
          :errorText="errorName"
          v-model="name"
        />
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
      <AppBtn>Создать аккаунт</AppBtn>

      <p class="privacy-policy-text">
        Регистрируясь, вы соглашаетесь с
        <br />
        <router-link to="/register" class="link">
          правилами обработки персональных данных</router-link
        >
      </p>
    </div>

    <p class="registration-text">
      Уже есть аккаунт?
      <router-link to="/login" class="link">Войти</router-link>
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
import { required, email, minLength, helpers } from "@vuelidate/validators";

import api from "@/axios/api";

const validName = (value) => {
  if (!helpers.req(value)) {
    return true;
  }

  const nameRegex = /^[a-zA-Zа-яА-Я]+(\s[a-zA-Zа-яА-Я]+){1,}$/;
  return nameRegex.test(value);
};

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
      name: "",
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
    errorName() {
      if (!this.v$.name.$error) return "";
      if (this.v$.name.required.$invalid) return "Поле не заполнено";
      if (this.v$.name.validName.$invalid)
        return "Неверный формат имени. Правильный формат - Иван Иванов";
      return "Неизвестная ошибка";
    },
  },
  validations() {
    return {
      name: { required, validName },
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
        name: this.name,
        login: this.email,
        password: this.password,
      };
      console.log(data);

      api
        .post("/registration", data)
        .then((response) => {
          console.log("registration", response);
          this.$store.commit("setUserData", { email: this.email });
          this.$router.push("/verify");
        })
        .catch((error) => {
          console.log("registration error", error);
        });
    },
  },
};
</script>
