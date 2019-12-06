<template>
  <div class="loading">
    <slot :context="loading ? 'is' : ''" />
    <div v-show="loading" class="message">Loading</div>
  </div>
</template>
<script>
export default {
  props: {
    loading: Boolean
  }
};
</script>
<style lang="scss">
.loading {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  &.is {
    filter: blur(10px) grayscale(1);
  }
  display: flex;
  justify-content: center;
  align-items: center;
}
.message {
  display: inline-block;
  font-size: 16px;
  text-align: center;
  position: relative;
  z-index: 99;
}
</style>
