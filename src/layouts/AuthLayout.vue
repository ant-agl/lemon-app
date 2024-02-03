<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <Transition appear>
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </Transition>
    </router-view>
  </div>
</template>
