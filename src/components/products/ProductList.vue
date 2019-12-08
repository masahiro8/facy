<template>
  <ul class="product-list">
    <li class="list-item" v-for="item in itemList" :key="item.id">
      <Product :item="item" @setProductId="setProductId" :selected="selected" />
    </li>
  </ul>
</template>

<script>
import * as _ from "lodash";
import Product from "./Product.vue";

export default {
  data: () => {
    return {
      items: [],
      selected: null
    };
  },
  props: {
    products: {
      type: Object
    },
    productType: {
      type: String
    },
    categoryId: {
      type: Object,
      default: null
    }
  },
  components: {
    Product
  },
  mounted() {},
  methods: {
    setProductId(id) {
      this.selected = id;
      if (!id) {
        this.$emit("setProductId", {
          productId: null,
          productType: this.productType
        });
        return;
      }
      this.$emit("setProductId", {
        productId: this.selected,
        productType: this.productType
      });
    }
  },
  computed: {
    itemList() {
      if (this.products && this.productType && this.categoryId) {
        // return this.products[this.productType].products;
        return _.filter(this.products[this.productType].products, item => {
          return item.category === this.categoryId.id;
        });
      }
      return [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.product-list {
  position: relative;
  bottom: 24px;
  overflow: scroll;
  list-style-type: none;
  display: flex;
  align-items: center;
  padding: $padding-20;
  padding-top: 32px;
  height: 194px;
}

.list-item {
  margin-right: $padding-15;
}
</style>
