<template>
  <div
    class="modal"
    :class="{ active: active }"
    @keydown.prevent.esc="$emit('close')"
    tabindex="0"
    ref="modal"
  >
    <div class="modal__content">
      <button class="modal__close" @click.prevent="$emit('close')">
        <img src="@/assets/img/icons/cross.svg" />
      </button>
      <div class="modal__head">
        <div class="modal__title">
          {{ title }}
          <slot name="title"></slot>
        </div>
        <div v-if="desc" class="modal__desc">{{ desc }}</div>
      </div>
      <div v-if="isSlot" class="modal__body">
        <slot></slot>
      </div>

      <div v-if="$slots.footer" class="modal__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    title: String,
    desc: String,
    active: Boolean,
  },
  watch: {
    active() {
      if (this.active) {
        setTimeout(() => {
          this.$refs.modal.focus();
        }, 100);
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    },
  },
  computed: {
    isSlot() {
      return this.$slots.default ? true : false;
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: #00000052;
  display: flex;
  align-items: center;
  justify-content: center;
  visibility: hidden;
  transition: 0.3s;
  opacity: 0;
  z-index: -1;
  box-sizing: border-box;
}
.modal__content {
  background-color: var(--dark-color-2);
  border-radius: 15px;
  padding: 40px 60px;
  position: relative;
  max-width: 95%;
  width: 520px;
  transition: 0.3s;
  transform: scale(0.9);
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}
.middle .modal__content {
  width: 628px;
}
.big .modal__content {
  max-width: 1024px;
}
.modal.active {
  opacity: 1;
  z-index: 10;
  visibility: visible;
}
.modal.active .modal__content {
  transform: scale(1);
}
.modal__close {
  position: absolute;
  top: 28px;
  right: 28px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: 0.2s;
  border: none;
  opacity: 0.7;
  background: none;
}
.modal__close:hover {
  opacity: 1;
}
.modal__title {
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  font-family: "Jura";
}
.modal__desc {
  font-size: 14px;
  line-height: 22px;
  color: #919eab;
}
.modal__body {
  margin-top: 24px;
  color: #fff;
  font-size: 20px;
}
.modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}
:deep(.modal__row) {
  display: flex;
  gap: 20px;
  align-items: flex-end;
}
</style>
