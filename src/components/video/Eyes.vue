<template>
  <div>
    <canvas
      ref="canvas"
      class="overlay"
      :width="canvas_rect.width+'px'"
      :height="canvas_rect.height+'px'"
    />
  </div>
</template>
<script>
import * as _ from "lodash";
import { houghTransform } from "../../util/houghTransform";
import { drawLense, clearLense, maskDraw } from "../../util/drawLense";
export default {
  data: () => {
    return {
      canvas_rect: {}
    };
  },
  props: {
    rect: Object,
    src: HTMLVideoElement,
    points: Object,
    left_right: String
  },
  watch: {
    rect: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (
          JSON.stringify(newValue) !== JSON.stringify(oldValue) &&
          this.$refs.canvas
        ) {
          const _width = newValue.width - newValue.x * 2;
          this.canvas_rect = {
            width: _width,
            height: newValue.height
          };
        }
      }
    },
    points: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (
          JSON.stringify(newValue) !== JSON.stringify(oldValue) &&
          Object.keys(newValue).length > 0
        ) {
          const eye = this.left_right;
          console.log("Eyes shift rate", newValue.shift.x, newValue.rate.x);
          const left = houghTransform(newValue.eyes.left);
          const right = houghTransform(newValue.eyes.right);
          const shift = newValue.shift;
          const rate = newValue.rate;
          clearLense(this.$refs.canvas);
          //canvasclip()

          //両目の大きさを揃える
          if (left.r > right.r) {
            right.r = left.r;
          } else if (right.r > left.r) {
            left.r = right.r;
          }

          //左目の描画
          if (eye == "left") {
            //マスク
            maskDraw(this.$refs.canvas, newValue.face.left, shift, rate);
            //レンズ
            drawLense(this.$refs.canvas, left);
          }
          //右目の描画
          if (eye == "right") {
            //マスク
            maskDraw(this.$refs.canvas, newValue.face.right, shift, rate);
            //レンズ
            drawLense(this.$refs.canvas, right);
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./canvas.scss";
.overlay {
  mix-blend-mode: soft-light;
}
</style>