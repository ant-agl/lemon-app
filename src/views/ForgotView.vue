<template>
  <form @submit.prevent="sendForm">
    <div class="names-block">
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
          :icon="require('@/assets/icons/emailicon.svg')"
          :error="v$.email.$error"
          :errorText="errorEmail"
          v-model="email"
        />
      </div>
    </div>

    <AppBtn>Отправить</AppBtn>
    <div class="back-btn">
      <router-link to="/register" class="link"
        ><img src="@/assets/icons/back.svg" alt="" />Вернуться</router-link
      >
    </div>
  </form>
</template>

<script>
import AppBtn from "@/components/AppBtn";
import AppInput from "@/components/AppInput";

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    AppBtn,
    AppInput,
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
        email: this.email,
      };
      console.log(data);
      this.$router.push({ path: "/verify-link", query: { email: this.email } });
    },
  },
};
</script>

<style scoped>
.back-btn {
  display: flex;
}
.back-btn img {
  margin-right: 7px;
}
.link {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
}
</style>
