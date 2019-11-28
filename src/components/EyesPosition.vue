<template>
  <div class="eyes">
    <div :class="'eye ' + color"></div>
    <div :class="'eye ' + color"></div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";

.eyes {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 225px;
}
.eye {
  width: 86px;
  height: 48px;
  border: 1px solid $color-base-40;
  border-radius: 50%;
  &.white {
    border-color: white;
  }
}
</style>
