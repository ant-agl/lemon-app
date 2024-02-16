<template>
  <div class="background-container">
    <router-view v-slot="{ Component, route }">
      <Transition appear>
        <div :key="route.name" class="auth-form-container">
          <component :is="Component" />
        </div>
      </Transition>
    </router-view>
  </div>
</template>

<style scoped lang="scss">
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-color);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  background-image: url("@/assets/bg.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
}

.auth-form-container {
  max-width: 380px;
  text-align: center;
  background-color: #fff;
  padding: 30px 80px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-weight: 300;
  overflow-y: auto;
  @media (max-width: 768px) {
    padding: 30px 50px;
  }
  @media (max-width: 375px) {
    padding: 10px 20px;
  }
}

:deep(.title) {
  font-size: 40px;
  font-weight: 600;
  font-family: "Jura", sans-serif;
  margin: 0px;
  @media (max-width: 375px) {
    font-size: 30px;
  }
}
:deep(.subtitle) {
  font-size: 24px;
  margin-top: 5px;
  margin-bottom: 25px;
  @media (max-width: 375px) {
    font-size: 18px;
  }
}

:deep(.privacy-policy-text) {
  font-weight: 600;
  font-size: 12px;
}

:deep(.registration-text) {
  font-weight: 600;
  font-size: 20px;
  margin-top: 30px;
  @media (max-width: 375px) {
    font-size: 16px;
  }
}

:deep(.icon-container) {
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  gap: 30px;
}
</style>
