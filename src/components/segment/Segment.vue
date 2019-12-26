<template>
  <button @click="clickHandler(id)" class="segment" :class="selected?'selected':null">{{title}}</button>
</template>
<script>
export default {
  props: {
    id: {
      type: String
    },
    title: {
      type: String
    },
    selected: {
      type: Boolean
    }
  },
  methods: {
    clickHandler(id) {
      this.$emit("clickHandler", id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.segment {
  padding: $padding-5;
  max-width: 96px;
  height: 32px;
  background: white;
  border: 0;
  border-radius: 10px;
  outline: none;
  font-size: $padding-15;
  color: $color-gray-30;

  &.selected {
    color: $color-base-10;
    font-weight: bold;
  }
}
</style>
