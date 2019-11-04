<template>
  <button class="btn" @click="shoot">shoot</button>
</template>
<script>
export default {
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
<style lang="scss" scoped>
.btn {
  width: 180px;
  height: 60px;
  position: fixed;
  bottom: 16px;
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