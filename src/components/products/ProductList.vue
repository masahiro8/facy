<template>
  <ul class="product-list">
    <li class="list-item" v-for="item in items" :key="item.id">
      <Product :item="item" @setProductId="setProductId" :selected="selected" />
    </li>
  </ul>
</template>

<script>
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
    },
    setItems() {
      if (this.products && this.productType) {
        this.items = this.products[this.productType].products;
      }
    }
  },
  watch: {
    products: {
      immediate: true,
      handler(newValue) {
        this.$nextTick(() => {
          this.setItems();
        });
      }
    },
    productType: {
      immediate: true,
      handler(newValue) {
        this.$nextTick(() => {
          this.setItems();
        });
      }
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
  padding-top: 32px;
}

.list-item {
  margin-right: $padding-15;
}
</style>
