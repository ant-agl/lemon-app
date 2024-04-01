<template>
  <AppModal
    :active="active"
    title="Точно хотите выйти?"
    @close="$emit('close')"
  >
    <template #footer>
      <AppBtn class="full-w cancel" @click="$emit('close')">Отмена</AppBtn>
      <AppBtn class="full-w dangerBgDark" @click="$emit('logout')">
        Выйти
      </AppBtn>
    </template>
  </AppModal>
</template>

<script>
import AppModal from "@/components/AppModal";
import AppBtn from "@/components/AppBtn";

export default {
  emits: ["close", "logout"],
  components: { AppModal, AppBtn },
  props: {
    active: Boolean,
  },
};
</script>
