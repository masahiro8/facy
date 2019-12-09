<template>
  <div class="face">
    <canvas
      ref="face"
      class="overlay face"
      id="face"
      :width="canvas_rect.width"
      :height="canvas_rect.height"
    />
  </div>
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
          console.log(
            "newValue relative positions",
            newValue.eyes.result.landmarks.relativePositions
          );
          const _points = newValue.eyes.result.landmarks.relativePositions;
          let points = [];
          const shift = newValue.shift;
          const rate = newValue.rate;
          for (let i = 0; i < _points.length; i++) {
            points.push({
              x: _points[i]._x,
              y: _points[i]._y
            });
          }

          const boxWidth = newValue.eyes.result.landmarks.imageWidth;
          const boxHeight = newValue.eyes.result.landmarks.imageHeight;
          const textureImg = "wireframe.png";
          //この関数はpublic/js/faceModel.jsにある
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
