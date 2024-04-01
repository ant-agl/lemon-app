<template>
  <div class="header">
    <h1 class="title">Профиль</h1>

    <div class="header__btns">
      <IconBtn @click="modalLogout = true">
        <img src="@/assets/img/icons/logout.svg" alt="Выход" />
      </IconBtn>
    </div>
  </div>

  <ProfileDataList :data="data" />
  <ModalLogout
    :active="modalLogout"
    @close="modalLogout = false"
    @logout="logout"
  />
</template>

<script>
import ProfileDataList from "@/components/ProfileDataList";
import IconBtn from "@/components/IconBtn";
import ModalLogout from "@/components/ModalLogout";

import { mapGetters } from "vuex";

export default {
  components: { ProfileDataList, IconBtn, ModalLogout },
  data: () => ({
    modalLogout: false,
  }),
  computed: {
    ...mapGetters(["userData"]),
    data() {
      return [{ value: this.userData.name }, { value: this.userData.login }];
    },
  },
  methods: {
    logout() {
      this.$router.push("/login");
      this.$store.dispatch("logout");
    },
  },
};
</script>
