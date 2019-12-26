<template>
  <button @click="clickHandler(item.id)" class="category" :class="selected?'selected':null">
    <img :src="getImagePath(item)" />
  </button>
</template>
<script>
export default {
  props: {
    item: {
      type: Object
    },
    selected: {
      type: Boolean
    }
  },
  methods: {
    getImagePath: item => {
      return `${window.location.origin}/images/category/${item.image}`;
    },
    clickHandler(id) {
      this.$emit("clickHandler", id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.category {
  padding: $padding-5;
  width: 96px;
  height: 32px;
  background: white;
  border: 0;
  border-radius: 10px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2);
  outline: none;

  img {
    width: auto;
    height: 100%;
    opacity: 0.3;
  }

  &.selected {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    img {
      opacity: 1;
    }
  }
}
</style>
