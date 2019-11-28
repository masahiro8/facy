<template>
  <button class="next-button" @click="$emit('goNext')">
    <p>NEXT</p>
    <div class="icon"><Navigation :size="20" /></div>
  </button>
</template>

<script>
import Navigation from "vue-material-design-icons/Navigation.vue";
export default {
  components: {
    Navigation
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/config.scss";

.next-button {
  position: relative;
  padding: $padding-20 44px;
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

.icon {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%) rotate(90deg);
}
</style>
