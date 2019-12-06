<template>
  <ul class="product-list">
    <li class="list-item" v-for="item in items" :key="item.id">
      <Product :item="item" @setProductId="setProductId" :selected="selected" />
    </li>
  </ul>
</template>

<script>
import Product from "./Product.vue";
import { productapi } from "../../services/api";
import { PRODUCT_TYPE } from "../../constants";
import { ContextStore } from "../../context/Store";

export default {
  data: () => {
    return {
      items: [],
      selected: null
    };
  },
  props: {
    items: {
      type: Array
    },
    productType: {
      type: String
    }
  },
  components: {
    Product
  },
  mounted() {
    this.loadProducts();
  },
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
    },
    async loadProducts() {
      const result = await productapi.get("", {});
      this.items = result.data[this.productType].products;
      ContextStore.setContext("PRODUCTS", this.items);
    }
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
