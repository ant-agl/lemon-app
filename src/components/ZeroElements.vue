<template>
  <div class="zero-elements">
    <div class="zero-elements__text">
      <slot></slot>
    </div>
    <AppBtn @click.prevent="$emit('create')">
      <span>{{ btnText }}</span>
      <img src="@/assets/img/icons/plus.svg" />
    </AppBtn>
  </div>
</template>

<script>
import AppBtn from "@/components/AppBtn";

export default {
  emits: ["create"],
  components: { AppBtn },
  props: {
    btnText: {
      type: String,
      default: "Добавить",
    },
  },
};
</script>

<style lang="scss" scoped>
.zero-elements {
  background-color: var(--dark-color-2);
  border-radius: 15px;
  padding: 30px 40px;
  width: 340px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  box-shadow: var(--shadow-dark-items);

  &__text {
    color: #fff;
    font-size: 22px;
    text-align: center;
  }
}
</style>
