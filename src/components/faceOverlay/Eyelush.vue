<template>
  <div ref="overlayFrame" class="overlayFrame eyelush">
    <canvas
      ref="eyelush"
      :id="productType"
      class="overlay"
      :style="getStyle"
      :width="frame_rect.width"
      :height="frame_rect.height"
    />
  </div>
</template>
<script>
import * as _ from "lodash";
import { PRODUCT_TYPE } from "../../constants";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../config";

export default {
  data: () => {
    return {
      frame_rect: {
        width: 0,
        height: 0
      },
      product: null,
      item_image: ""
    };
  },
  props: {
    rect: {
      type: Object,
      default: null
    },
    points: Object,
    productId: Object,
    products: Object,
    productType: String,
    zIndex: {
      type: Number,
      default: 3
    }
  },

  mounted() {
    this.frame_rect = this.$refs.overlayFrame.getBoundingClientRect();
    this.layoutUpdate();
    this.$nextTick(() => {
      this.clearCanvas();
    });
  },

  methods: {
    draw(right, left, image) {
      //テクスチャ画像の指定
      const textureImg = image;
      /* eslint-disable */
      drawEyelush(
        this.productType,
        { right, left },
        this.frame_rect,
        textureImg
      );
      /* eslint-enable */
    },
    //キャンバスクリア
    clearCanvas() {},
    layoutUpdate() {
      if (this.rect && this.frame_rect.width && this.frame_rect.height) {
        const frame = {
          left: (WINDOW_WIDTH - this.frame_rect.width) / 2
        };
        this.$refs.eyelush.style.width = `${this.frame_rect.width}px`;
        this.$refs.eyelush.style.height = `${this.frame_rect.height}px`;
      }
    }
  },
  watch: {
    products: {
      immediate: true,
      handler(newValue) {
        console.log("products", newValue);
      }
    },
    productId: {
      // immediate: true,
      handler(newValue, oldValue) {
        if (!newValue) {
          this.clearCanvas();
        }
        const product = _.find(
          this.products[this.productType].products,
          product => {
            return product.id === newValue.productId;
          }
        );
        console.log(
          "productId",
          newValue,
          this.products[this.productType].products
        );
        if (product) {
          this.product = product;
          this.item_image = `${window.location.origin}/images/${product.category}/${product.image}`;
          const right = this.points.eyes.right.eyelid;
          const left = this.points.eyes.left.eyelid;
          this.draw(right, left, this.item_image);
        }
      }
    },
    rect: {
      immediate: true,
      handler() {
        this.layoutUpdate();
      }
    }
  },
  computed: {
    getStyle() {
      let style = "";
      style += `z-index:${this.z};`;
      return style;
    }
  }
};
</script>
<style lang="scss" scoped>
.overlayFrame {
  position: absolute;
  width: 375px;
  height: 100%;
  overflow: hidden;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  transform: scale(-1, 1);
  mix-blend-mode: multiply;
  // mix-blend-mode: luminosity;
}
</style>
