<template>
  <form @submit.prevent="sendForm">
    <div class="auth-header">
      <p class="title">Подтверждение почты</p>
      <p class="subtitle">Введите 6-значный код с почты {{ userData.login }}</p>
    </div>

    <div class="information-container">
      <div class="fields-container">
        <InputsCode
          :length="lengthCode"
          v-model="code"
          :isError="isErrorCode"
          @input="isErrorCode = !code.length"
        />
      </div>

      <SendAnother :startTime="60" url="#" />

      <AppBtn class="full-w">Подтвердить</AppBtn>
    </div>

    <AppBtnBack />
  </form>
</template>

<script>
import AppBtnBack from "@/components/AppBtnBack";
import SendAnother from "@/components/SendAnother";
import InputsCode from "@/components/InputsCode";
import AppBtn from "@/components/AppBtn";

import { mapGetters } from "vuex";

import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  setup: () => ({
    v$: useVuelidate(),
  }),
  components: { AppBtnBack, SendAnother, InputsCode, AppBtn },
  data: () => ({
    code: "",
    isErrorCode: false,
    lengthCode: 6,
  }),
  computed: {
    ...mapGetters(["userData"]),
  },
  watch: {
    code(code) {
      if (code.length >= this.lengthCode) {
        this.sendForm();
      }
    },
  },
  validations: {
    code: { required, minLength: minLength(6) },
  },
  methods: {
    sendForm() {
      if (this.v$.$invalid) {
        this.isErrorCode = true;
        this.code = "";
        return;
      }

      let data = {
        login: this.userData.login,
        code: this.code,
      };
      console.log(data);

      this.$store
        .dispatch("confirmEmail", data)
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {});
    },
  },
  mounted() {
    if (!this.userData.login) this.$router.push("/login");
  },
};
</script>
