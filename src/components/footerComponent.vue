<template>
  <div class="w-100 position-absolute bottom-0">
    <div class="d-flex justify-content-center py-2">
      <p class="m-0">Made with</p>
      <div class="heart position-relative mx-2" tabindex="-1">
        <div class="square w-100 h-100 bg-danger position-absolute"></div>
        <div
          class="circle-left w-100 h-100 rounded-circle bg-danger position-absolute"
        ></div>
        <div
          class="circle-right w-100 h-100 rounded-circle bg-danger position-absolute"
        ></div>
      </div>
      <p class="m-0">by <span class="fw-bold green">Nuno & Milan</span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "footerComponent",
};
</script>
<style scoped>
div {
  font-size: 12px;
}
.heart {
  width: 7px;
  height: 7px;
  margin-top: 6px;
}
.square {
  transform: rotate(45deg);
  border-radius: 0 0 20% 0;
}
.circle-left {
  transform: translate(-40%, -40%);
}
.circle-right {
  transform: translate(40%, -40%);
}
</style>
