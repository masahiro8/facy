<template>
  <ul class="category-list">
    <li class="list-item" v-for="item in itemList" :key="item.id">
      <Category :selected="getSelected(item)" :item="item" @clickHandler="setCategory" />
    </li>
  </ul>
</template>
<script>
import Category from "./Category.vue";
import { ContextStore } from "../../context/Store";
export default {
  data: () => {
    return {
      categories: []
    };
  },
  props: {
    segment: {
      type: Object
    },
    products: {
      type: Object
    },
    categoryId: {
      type: Object
    }
  },
  components: {
    Category
  },
  methods: {
    setCategory(id) {
      ContextStore.setContext("CATEGORY", { id });
    },
    getSelected(category) {
      if (!this.categoryId || !this.categoryId.id) return null;
      return this.categoryId.id === category.id;
    }
  },
  //computedで返したいけど、なぜか駄目
  computed: {
    itemList() {
      if (this.products && this.segment) {
        return this.products[this.segment.id].category;
      }
      return [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.category-list {
  overflow: scroll;
  padding: $padding-5 $padding-10;
  list-style-type: none;
  display: flex;
  background-color: white;
}

.list-item {
  margin-right: $padding-15;
}
</style>
