<template>
  <div class="loader-wrapper">
    <div class="loader-bg">
      <span class="loader"></span>
    </div>
  </div>
</template>

<style scoped>
.loader-wrapper {
  text-align: center;
}
.loader-bg {
  background-color: var(--dark-color-2);
  /* width: 250px; */
  height: 150px;
  position: relative;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  box-shadow: var(--shadow-dark-items);
}
.loader {
  width: 48px;
  height: 48px;
  border: 5px solid var(--main-color);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  animation: pulse 1s linear infinite;
}
.loader:after {
  content: "";
  position: absolute;
  width: 48px;
  height: 48px;
  border: 5px solid var(--main-color);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: scaleUp 1s linear infinite;
}

@keyframes scaleUp {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  60%,
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
@keyframes pulse {
  0%,
  60%,
  100% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.2);
  }
}
</style>
