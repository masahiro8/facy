<template>
  <canvas
    ref="face"
    class="overlay face"
    id="face"
    :width="canvas_rect.width"
    :height="canvas_rect.height"
  />
</template>
<script>
import * as _ from "lodash";

export default {
  data: () => {
    return {
      canvas_rect: {}
    };
  },
  props: {
    rect: Object,
    points: Object
  },
  watch: {
    rect: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (
          JSON.stringify(newValue) !== JSON.stringify(oldValue) &&
          this.$refs.face
        ) {
          const _width = newValue.width - newValue.x * 2;
          this.canvas_rect = {
            width: _width,
            height: newValue.height
          };
          console.log("canvas_rect", this.canvas_rect);
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
          console.log("newValue", newValue);

          let points = [];

          // for (let i = 0; i < _points.length; i++) {
          //   points.push({
          //     x: _points[i]._x,
          //     y: _points[i]._y
          //   });
          // }

          const textureImg = "eyeshadow01.png";
          //drawFaceMask は public/js/faceModel.js から
          drawFaceMask(points, shift, boxWidth, boxHeight, textureImg); // eslint-disable-line
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./canvas.scss";
.overlay {
  &.face {
    mix-blend-mode: multiply;
  }
}
</style>
