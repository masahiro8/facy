<template>
  <div class="category">
    <img :src="getImagePath(item)" />
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    getImagePath: item => {
      return `${window.location.origin}/images/category/${item.image}`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.category {
  padding: $padding-10;
  width: 138px;
  height: 54px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  img {
    width: 100%;
    height: auto;
  }
}
</style>
