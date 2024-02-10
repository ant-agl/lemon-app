<template>
  <div class="background-container">
    <div class="background-image"></div>
    <router-view v-slot="{ Component, route }">
      <Transition appear>
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </Transition>
    </router-view>
  </div>
</template>

<style scoped>
.background-container {
  position: relative;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/Фон.svg'); 
  background-color: #24231f;
  background-size: cover;
  background-position: center;
  opacity: 1; 
  z-index: -1;
}


</style>