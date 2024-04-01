<template>
  <AppModal
    :active="active"
    title="Подтвердите действие"
    @close="$emit('close')"
  >
    <slot></slot>

    <template #footer>
      <AppBtn class="full-w cancel" @click="$emit('close')">Отмена</AppBtn>
      <AppBtn class="full-w dangerBgDark" @click="$emit('delete')">
        Да, удалить
      </AppBtn>
    </template>
  </AppModal>
</template>

<script>
import AppModal from "@/components/AppModal";
import AppBtn from "@/components/AppBtn";

export default {
  emits: ["close", "delete"],
  components: { AppModal, AppBtn },
  props: {
    active: Boolean,
  },
};
</script>
