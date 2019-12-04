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
// import { drawFaceMask } from "../../util/faceModel";

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
          console.log("rate", newValue);
          // console.log("newValue", newValue.eyes.result.landmarks.positions);
          const _points = newValue.eyes.result.landmarks.positions;
          let points = [];
          const shift = newValue.shift;
          const rate = newValue.rate;
          for (let i = 0; i < _points.length; i++) {
            points.push({
              x: _points[i].x + shift.x,
              y: _points[i].y + shift.y
            });
          }

          // console.log(points);
          // eslint-disable-next-line
          drawFaceMask(points); // eslint-disable-line
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
    // mix-blend-mode: multiply;
  }
}
</style>
