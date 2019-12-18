<template>
  <button class="shoot-button" @click="shoot">
    <div class="icon">
      <Camera :size="48" />
    </div>
  </button>
</template>

<script>
import Camera from "vue-material-design-icons/Camera.vue";

export default {
  components: {
    Camera
  },
  data: () => {
    return {};
  },
  methods: {
    shoot() {
      this.$emit("shoot");
    }
  }
};
</script>

//
<style lang="scss" scoped>
.btn {
  // width: 180px;
  // height: 60px;
  // position: fixed;
  // bottom: 16px;
  left: calc(50vw - 90px);
  z-index: 10;
  border: none;
  background: white;
  outline: none;
  &:active {
    transform: scale(1.05);
  }
}
</style>

<style lang="scss" scoped>
@import "../../style/config.scss";

.shoot-button {
  z-index: 10;
  position: fixed;
  bottom: 56px;
  left: calc(50vw);
  transform: translateX(-50%);
  padding: $padding-20;
  outline: none;
  border-radius: 100px;
  background: linear-gradient(
    143.65deg,
    $color-base-20 14.87%,
    $color-base-30 70.49%
  );
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  font-size: $font-60;
  letter-spacing: 8px;
  line-height: $label;
  text-align: center;
  color: white;
}
</style>
