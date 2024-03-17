<template>
  <div class="background-container">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="Лого Лимон" />
    </div>
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
.logo {
  width: 220px;
  position: fixed;
  z-index: 0;
  top: 44px;
  left: 56px;
  @media (max-width: 768px) {
    width: auto;
    left: auto;
  }
  @media (max-width: 425px) {
    top: 10px;
  }
}
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
  flex-direction: column;
  gap: 30px;
  overflow-y: auto;
  background-image: url("@/assets/bg.svg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
}

.auth-form-container {
  min-width: 400px;
  max-width: 620px;
  background-color: #fff;
  padding: 30px 80px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-weight: 300;
  overflow-y: auto;
  @media (max-width: 768px) {
    min-width: auto;
    padding: 30px 50px;
  }
  @media (max-width: 375px) {
    padding: 10px 20px;
  }
  :deep(form) {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}
:deep(.information-container) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
:deep(.auth-header) {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

:deep(.title) {
  font-size: 40px;
  font-weight: 600;
  font-family: "Jura", sans-serif;
  @media (max-width: 375px) {
    font-size: 30px;
  }
}

:deep(.subtitle) {
  font-size: 24px;
  text-align: center;
  @media (max-width: 375px) {
    font-size: 18px;
  }
}
:deep(.fields-container) {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

:deep(.privacy-policy-text) {
  font-weight: 600;
  font-size: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

:deep(.registration-text) {
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  @media (max-width: 375px) {
    font-size: 16px;
  }
}

:deep(.icon-container) {
  display: flex;
  justify-content: center;
  gap: 30px;
}
</style>
