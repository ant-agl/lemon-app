<template>
  <div class="send-another">
    <a
      href="#"
      class="link send-another__link"
      :class="{ disabled: isTimer }"
      @click.prevent="send"
    >
      Отправить повторный код
      <span v-if="isTimer"> {{ minutes }}:{{ seconds }} </span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    startTime: Number,
    url: String,
  },
  data: () => ({
    isTimer: true,
    interval: false,
    time: 0,
  }),
  computed: {
    minutes() {
      return Math.floor(this.time / 60);
    },
    seconds() {
      let seconds = this.time % 60;
      if (seconds < 10) seconds = "0" + seconds;
      return seconds;
    },
  },
  mounted() {
    this.time = this.startTime;
    this.interval = setInterval(() => {
      this.updateTime();
      if (this.time <= 0) this.isTimer = false;
    }, 1000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
  methods: {
    updateTime() {
      this.time--;
    },
    send(e) {
      if (e.target.classList.contains("disabled")) return;

      this.isTimer = true;
      this.time = this.startTime;

      // send data
      console.log(this.url);
    },
  },
};
</script>

<style scoped>
.send-another__link {
  font-size: 16px;
  line-height: 24px;
  transition: 0.2s;
}
</style>
