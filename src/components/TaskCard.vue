<template>
  <div class="task-card">
    <div
      class="task-card__priority"
      :style="{ backgroundColor: priority.color }"
    ></div>
    <div class="task-card__desc">
      <div class="task-card__title">{{ task.name }}</div>
      <div class="task-card__project">
        <span :style="{ backgroundColor: project.color }"></span>
        {{ project.name }}
      </div>
    </div>
    <div class="task-card__deadline" :class="[deadlineColor]">
      {{ $moment(task.deadline).format("DD.MM.YYYY") }}
    </div>
    <div class="task-card__btns">
      <button class="task-card__btn">
        <img src="@/assets/img/icons/complete.svg" alt="" />
      </button>
      <button class="task-card__btn">
        <img src="@/assets/img/icons/play.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    task: Object,
  },
  computed: {
    ...mapGetters(["projects", "prioritiesList"]),
    project() {
      return this.projects[this.task.company_id].find(
        (p) => p.id == this.task.project_id
      );
    },
    priority() {
      return this.prioritiesList.find((p) => p.id == this.task.priority);
    },
    deadlineColor() {
      return this.$moment(this.task.deadline).valueOf() > new Date().getTime()
        ? "green"
        : "red";
    },
  },
};
</script>

<style lang="scss" scoped>
.task-card {
  background-color: #fff;
  border-radius: 17px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.18);
  padding: 20px 50px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  &.small {
    transform: scale(0.85);
  }

  &__priority {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 55px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
  }

  &__project {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    color: black;
    opacity: 0.5;
    margin-top: 3px;

    span {
      display: block;
      width: 10px;
      height: 10px;
      border-radius: 10px;
    }
  }

  &__deadline {
    font-size: 16px;
    padding: 7px 13px;
    border-radius: 10px;
    &.green {
      background-color: #eaffe5;
    }
    &.red {
      background-color: #ffebeb;
    }
  }

  &__btns {
    display: flex;
    align-items: center;
  }

  &__btn {
    border-radius: 100px;
    transition: 0.2s;
    cursor: pointer;
    padding: 10px;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: var(--light-gray-color);
    }
  }
}
</style>
