<template>
  <ul class="category-list">
    <li class="list-item" v-for="item in itemList" :key="item.id">
      <Category :item="item" @clickHandler="setCategory" />
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
    productType: {
      type: String
    },
    items: {
      type: Object
    }
  },
  components: {
    Category
  },
  methods: {
    setCategory(id) {
      ContextStore.setContext("CATEGORY", { id });
    }
  },
  //computedで返したいけど、なぜか駄目
  computed: {
    itemList() {
      if (this.items && this.productType) {
        return this.items[this.productType].category;
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
  padding: $padding-20 $padding-10;
  list-style-type: none;
  display: flex;
  background-color: white;
}

.list-item {
  margin-right: $padding-15;
}
</style>
