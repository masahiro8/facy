<template>
  <div ref="overlayFrame" class="overlayFrame mesh">
    <canvas
      ref="mesh"
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
    zIndex: {
      type: Number,
      default: 3
    },
    productType: String
  },
  mounted() {
    this.frame_rect = this.$refs.overlayFrame.getBoundingClientRect();
    this.layoutUpdate();
    this.$nextTick(() => {
      this.clearCanvas();
    });
  },
  methods: {
    draw(points, image) {
      const _face = points;
      let _points = [
        ..._face.jaw,
        ..._face.right_eyebrow,
        ..._face.left_eyebrow,
        ..._face.nose,
        ..._face.right_eye,
        ..._face.left_eye,
        ..._face.mouth
      ];
      for (let i = 0; i < _points.length; i++) {
        _points[i] = {
          x: _points[i][0],
          y: _points[i][1],
          z: 0
        };
      }
      // console.log("_points", _points);
      //テクスチャ画像の指定
      const textureImg = image;
      /* eslint-disable */
      drawFaceMask(this.productType, _points, this.frame_rect, textureImg);
      /* eslint-enable */
    },
    //キャンバスクリア
    clearCanvas() {
      /* eslint-disable */
      const clearCanvasRect = canvas => {
        // console.log(
        //   "clear mesh",
        //   this.frame_rect.width,
        //   this.frame_rect.height
        // );
        // scene.remove(face);
        // geometry.dispose();
        // material.dispose();
        // texture.dispose();
      };
      clearCanvasRect(this.$refs.mesh);
      /* eslint-enable */
    },
    layoutUpdate() {
      if (this.rect && this.frame_rect.width && this.frame_rect.height) {
        const frame = {
          left: (WINDOW_WIDTH - this.frame_rect.width) / 2
        };
        this.$refs.mesh.style.width = `${this.frame_rect.width}px`;
        this.$refs.mesh.style.height = `${this.frame_rect.height}px`;
      }
    }
  },
  watch: {
    productId: {
      // immediate: true,
      handler(newValue, oldValue) {
        if (!newValue) {
          this.clearCanvas();
          return;
        }
        const product = _.find(
          this.products[this.productType].products,
          product => {
            return product.id === newValue.productId;
          }
        );
        // console.log(
        //   "productId",
        //   newValue,
        //   this.products[this.productType].products
        // );
        if (product) {
          this.product = product;
          this.item_image = `${window.location.origin}/images/${product.category}/${product.image}`;
          this.draw(this.points.face, this.item_image);
        } else {
          this.clearCanvas();
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