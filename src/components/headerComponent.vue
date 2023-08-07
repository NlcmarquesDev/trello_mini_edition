<template>
  <header class="p-3 border-bottom position-relative">
    <router-link
      to="/"
      class="text-decoration-none d-inline-block"
      @click="this.changePage"
    >
      <h1 class="fw-bold m-0">Tre<span>llo</span></h1>
    </router-link>

    <p class="m-0">{{ this.page }}</p>
    <div class="position-absolute top-50 end-0 translate-middle-y me-3">
      <p class="m-0 fw-bold fs-4">
        {{ this.hours }}
        <span class="green">:</span>
        {{ this.minutes }}
        <span class="green">:</span>
        {{ this.seconds }}
      </p>
    </div>
  </header>
</template>
<script>
export default {
  name: "headerComponent",
  props: {
    page: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      hours: null,
      minutes: null,
      seconds: null,
    };
  },
  methods: {
    changePage() {
      this.$emit("changePage", "");
    },
    setTime() {
      const date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      h = h <= 9 ? `${h}`.padStart(2, 0) : `${h}`;
      m = m <= 9 ? `${m}`.padStart(2, 0) : `${m}`;
      s = s <= 9 ? `${s}`.padStart(2, 0) : `${s}`;
      this.hours = h;
      this.minutes = m;
      this.seconds = s;
    },
  },
  created() {
    setInterval(() => this.setTime(), 1000);
  },
};
</script>
<style scoped>
header h1 {
  color: #2c3e50;
}
header h1 span {
  color: #42b983;
}
</style>
