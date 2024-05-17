<template>
  <component v-if="isValidToken" :is="layout">
    <router-view />
  </component>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  components: {
    AuthLayout,
    MainLayout,
  },
  data: () => ({
    isValidToken: false,
  }),
  computed: {
    layout() {
      return (this.$route.meta.layout || "main") + "-layout";
    },
  },
  mounted() {
    this.$store
      .dispatch("getUserData")
      .catch(() => {
        delete localStorage.token;
        if (this.$route.meta?.auth) this.$router.push("/login");
        if (this.$route.meta?.noauth) this.$router.push("/");
      })
      .finally(() => {
        this.isValidToken = true;
      });
  },
};
</script>

<style>
@import "@/assets/css/style.css";
</style>
