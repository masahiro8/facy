<template>
  <canvas
    ref="overlay"
    class="overlay"
    id="overlay"
    :width="pix(canvas_rect.width)"
    :height="pix(canvas_rect.height)"
  ></canvas>
</template>
<script>
import * as _ from "lodash";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../config";
import { face } from "../../util/face";
export default {
  data: () => {
    return {
      canvas_rect: {}
    };
  },
  mounted() {
    face.init();
  },
  props: {
    rect: Object,
    src: HTMLVideoElement
  },
  methods: {
    //撮影
    shoot() {
      const size = {
        w: this.canvas_rect.width,
        h: this.canvas_rect.height
      };

      const rects = {
        sx: this.rect.x / this.rect.rate,
        sy: 0,
        sw: size.w / this.rect.rate,
        sh: size.h / this.rect.rate,
        dx: 0,
        dy: 0,
        dw: WINDOW_WIDTH,
        dh: WINDOW_HEIGHT
      };

      const overlay = this.$refs.overlay;
      const ctx = this.$refs.overlay.getContext("2d");
      ctx.clearRect(0, 0, this.canvas_rect.width, this.canvas_rect.height);
      ctx.save();
      ctx.drawImage(
        this.src,
        rects.sx,
        rects.sy,
        rects.sw,
        rects.sh,
        0,
        0,
        rects.dw,
        rects.dh
      );
      ctx.restore();
      this.faceDetect();
    },
    pix(n) {
      return n + "px";
    },
    faceDetect() {
      face.getEyesPoints();
    }
  },
  watch: {
    rect: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue && this.$refs.overlay) {
          const _width = newValue.width - newValue.x * 2;
          this.canvas_rect = {
            width: _width,
            height: newValue.height
          };
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.overlay {
  border: 1px solid red;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  transform: scale(-1, 1);
}
</style>