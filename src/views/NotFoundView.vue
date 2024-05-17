<template>
  <h1>Ошибка 404</h1>
  <p>Данная страница не найдена</p>
  <router-link to="/">
    <AppBtn class="full-w">Перейти на главную</AppBtn>
  </router-link>
</template>

<script>
import AppBtn from "@/components/AppBtn";

export default {
  components: { AppBtn },
};
</script>

<style scoped>
h1 {
  font-family: "Jura";
  font-size: 45px;
}
p {
  margin: 20px 0;
  font-size: 19px;
}
</style>
