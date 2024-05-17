<template>
  <h1 class="title">Список приоритетных задач</h1>

  <div class="task-list">
    <TaskCard
      v-for="(task, i) in tasks"
      :key="task.id"
      :task="task"
      :class="{ small: i > 0 }"
    />
  </div>
</template>

<script>
import TaskCard from "@/components/TaskCard";

import { mapGetters } from "vuex";

export default {
  components: { TaskCard },
  computed: {
    ...mapGetters(["tasks"]),
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 700px;
  margin-left: auto;
  margin-right: auto;
}
</style>
