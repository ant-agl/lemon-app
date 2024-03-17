<template>
  <div>
    <BackLink link="/register" />
    <h1>{{ $t("verifyTitle") }}</h1>
  </div>
  <form class="form" @submit.prevent="sendForm">
    <InputsCode
      :length="lengthCode"
      v-model="code"
      :isError="isErrorCode"
      @input="isErrorCode = !code.length"
    />
    <SendAnother :startTime="60" :dataSend="$store.getters.userData" url="#" />
    <AppBtn classes="btn_auth">{{ $t("verify") }}</AppBtn>
  </form>
</template>

<script>
import BackLink from "@/components/BackLink";
import SendAnother from "@/components/SendAnother";
import InputsCode from "@/components/InputsCode";
import AppBtn from "@/components/App/AppBtn";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

export default {
  setup: () => ({
    v$: useVuelidate(),
  }),
  components: { BackLink, SendAnother, InputsCode, AppBtn },
  props: {
    userData: Object,
  },
  data: () => ({
    code: "",
    isErrorCode: false,
    lengthCode: 6,
  }),
  watch: {
    code(code) {
      if (code.length >= this.lengthCode) {
        this.sendForm();
      }
    },
  },
  mounted() {
    if (Object.keys(this.$store.getters.userData).length == 0) {
      // this.$router.push("/register");
    }
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
        code: this.code,
      };
      console.log(data);

      //send data
      if (this.code == "123123") {
        // success
        this.$router.push("/");
      } else {
        //error
        this.isErrorCode = true;
        this.code = "";
      }
    },
  },
};
</script>

<style scoped>
.send-another {
  margin-top: 8px;
}
</style>
