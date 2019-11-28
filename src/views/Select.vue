<template>
  <div class="select">
    <p>レンズ選択</p>
    <Item />
  </div>
</template>

<script>
import Item from "../components/products/ItemCard.vue";
export default {
  components: {
    Item
  }
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
</style>
