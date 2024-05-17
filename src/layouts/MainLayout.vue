<template>
  <!-- <Transition appear> -->
  <div class="main-layout">
    <AppSidebar />

    <div class="main-layout__content">
      <router-view v-slot="{ Component, route }">
        <Transition appear>
          <div :key="route.name">
            <component :is="Component" />
          </div>
        </Transition>
      </router-view>
    </div>
  </div>
  <!-- </Transition> -->
</template>

<script>
import AppSidebar from "@/components/AppSidebar";

export default {
  components: { AppSidebar },
};
</script>

<style lang="scss" scoped>
.main-layout {
  background-color: var(--main-light-color);
  height: 100vh;
  display: flex;
  overflow: hidden;

  &__content {
    width: 100%;
    overflow-y: auto;
    padding: 40px 70px;
    position: relative;

    :deep(.title) {
      font-family: "Jura";
      font-weight: 600;
      font-size: 40px;
    }
    :deep(.header) {
      margin-bottom: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    :deep(.header__btns) {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    :deep(.wrap-btns) {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 15px;
      margin-top: 20px;
    }
  }
}
</style>
