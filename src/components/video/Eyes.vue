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
    points: Object
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
          console.log("Eyes shift rate", newValue.shift.x, newValue.rate.x);
          const left = houghTransform(newValue.eyes.left);
          const right = houghTransform(newValue.eyes.right);
          const shift = newValue.shift;
          const rate = newValue.rate;
          clearLense(this.$refs.canvas);
          //canvasclip()

          //左目
          //マスク
          maskDraw(this.$refs.canvas, newValue.face.left, shift, rate);
          //レンzを描画
          drawLense(this.$refs.canvas, left);

          //右目
          //マスク
          // maskDraw(this.$refs.canvas, newValue.face.right, shift, rate, right);
          //レンズを描画
          // drawLense(this.$refs.canvas, right);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./canvas.scss";
</style>