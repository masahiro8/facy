<template>
  <ul class="category-list">
    <li class="list-item" v-for="item in categories" :key="item.id">
      <Category :item="item" />
    </li>
  </ul>
</template>
<script>
import Category from "./Category.vue";
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
      type: Array
    }
  },
  components: {
    Category
  },
  methods: {
    setCategories() {
      this.categories = this.items[this.productType].category;
    }
  },
  watch: {
    productType: {
      immediate: true,
      handler(newValue) {
        this.$nextTick(() => {
          this.setCategories();
        });
      }
    },
    items: {
      immediate: true,
      handler(newValue) {
        this.$nextTick(() => {
          this.setCategories();
        });
      }
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
