<template>
  <div class="background-container">
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #24231f;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  background-image: url('@/assets/Фон.svg'); 
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
}


</style>
