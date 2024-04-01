<template>
  <div class="development">
    <div class="development__img">
      <img src="@/assets/img/gears.png" alt="Gears" />
    </div>
    <h2 class="development__title">В разработке</h2>
    <p class="development__desc">Этот раздел скоро появится</p>
  </div>
</template>

<style lang="scss" scoped>
.development {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__img {
    width: 120px;
  }
  &__title {
    font-family: "Jura";
    font-weight: 700;
    font-size: 38px;
    margin-bottom: 5px;
  }
  &__desc {
    font-size: 24px;
  }
}
</style>
