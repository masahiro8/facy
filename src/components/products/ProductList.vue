<template>
  <ul class="product-list">
    <li class="list-item" v-for="item in items" :key="item.id">
      <Product :item="item" />
    </li>
  </ul>
</template>

<script>
import Product from "./Product.vue";
export default {
  props: {
    items: {
      type: Array
    }
  },
  components: {
    Product
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.product-list {
  overflow: scroll;
  list-style-type: none;
  display: flex;
  align-items: center;
  padding: $padding-20;
  height: 194px;
}

.list-item {
  margin-right: $padding-15;
}
</style>
