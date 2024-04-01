<template>
  <div class="back-btn">
    <router-link :to="backLink" class="link">
      <img src="@/assets/img/icons/back.svg" alt="" />
      Вернуться
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: null,
    },
  },
  computed: {
    backLink() {
      if (this.link) return this.link;

      const back = this.$router.options.history.state.back;
      if (back) return back;

      return "/";
    },
  },
};
</script>
