<template>
  <ul class="category-list">
    <li class="list-item" v-for="item in items" :key="item.id">
      <Category :item="item" />
    </li>
  </ul>
</template>

<script>
import Category from "./Category.vue";
export default {
  props: {
    items: {
      type: Array
    }
  },
  components: {
    Category
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.category-list {
  overflow: scroll;
  padding: $padding-20 $padding-10;
  list-style-type: none;
  display: flex;
  background-color: white;
}

.list-item {
  margin-right: $padding-15;
}
</style>
