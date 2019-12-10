<template>
  <div ref="overlayFrame" class="overlayFrame">
    <canvas
      ref="mesh"
      class="overlay mesh"
      :style="getStyle"
      :width="frame_rect.width"
      :height="frame_rect.height"
    />
    <p>{{ points.face }}</p>
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
      canvas_rect: {}
    };
  },
  props: {
    rect: {
      type: Object,
      default: null
    },
    points: Object,
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
    //キャンバスクリア
    clearCanvas() {
      const clearCanvasRect = canvas => {
        const ctx = canvas.getContext("2d");
        ctx.restore();
        console.log(
          "clear mesh",
          this.frame_rect.width,
          this.frame_rect.height
        );
        ctx.clearRect(0, 0, this.frame_rect.width, this.frame_rect.height);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();
      };
      clearCanvasRect(this.$refs.mesh);
    },
    layoutUpdate() {
      if (this.rect && this.frame_rect.width && this.frame_rect.height) {
        const frame = {
          left: (WINDOW_WIDTH - this.frame_rect.width) / 2
        };
        this.$refs.mesh.style.width = `${this.frame_rect.width}px`;
        this.$refs.mesh.style.height = `${this.frame_rect.height}px`;

        //画像
        const _width = this.rect.width - this.rect.x * 2;
        this.canvas_rect = {
          width: _width,
          height: this.rect.height
        };
      }
    }
  },

  watch: {
    rect: {
      immediate: true,
      handler() {
        this.layoutUpdate();
      }
    },
    points: {
      immediate: true,
      handler() {
        const textureImg = "eyeshadow01.png";
        //drawFaceMask は public/js/faceModel.js から
        // drawFaceMask(points, boxWidth, boxHeight, textureImg); // eslint-disable-line
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
  mix-blend-mode: soft-light;
  mix-blend-mode: luminosity;
}
</style>
