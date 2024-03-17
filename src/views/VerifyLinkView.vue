<template>
  <form @submit.prevent="sendForm">
    <div class="auth-header">
      <p class="title">Подтвердите E-mail</p>
      <p class="subtitle">Мы отправили вам письмо на {{ email }}</p>
    </div>
    <AppBtn>Войти</AppBtn>
  </form>
</template>

<script>
import AppBtn from "@/components/AppBtn";

export default {
  components: {
    AppBtn,
  },
  computed: {
    email() {
      return this.$route.query.email || "";
    },
  },
  methods: {
    sendForm() {
      this.$router.push("/login");
    },
  },
};
</script>
