<template>
  <div ref="overlayFrame" class="overlayFrame cheeks">
    <canvas
      ref="cheeks"
      id="cheeks"
      class="overlay"
      :style="getStyle"
      :width="frame_rect.width"
      :height="frame_rect.height"
    />
  </div>
</template>
<script>
import * as _ from "lodash";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../config";

export default {
  data: () => {
    return {
      frame_rect: {
        width: 0,
        height: 0
      }
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
      this.displayTest();
      // this.clearCanvas();
    });
  },

  methods: {
    // 確認用（実装入ったら消してください）
    displayTest() {
      const drawTest = canvas => {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = 'rgb(00,255,00)'; 
        ctx.fillRect(40,430,60,60);
        ctx.fillRect(280,430,60,60);
        ctx.font = "20px Arial";
        ctx.fillText("Cheeks", 40,430);
      };
      drawTest(this.$refs.cheeks);
    },
    //キャンバスクリア
    clearCanvas() {
      // const clearCanvasRect = canvas => {
      //   const ctx = canvas.getContext("2d");
      //   ctx.restore();
      //   console.log(
      //     "clear cheeks",
      //     this.frame_rect.width,
      //     this.frame_rect.height
      //   );
      //   ctx.clearRect(0, 0, this.frame_rect.width, this.frame_rect.height);
      //   ctx.beginPath();
      //   ctx.moveTo(0, 0);
      //   ctx.lineTo(0, 0);
      //   ctx.stroke();
      // };
      // clearCanvasRect(this.$refs.cheeks);
    },
    layoutUpdate() {
      if (this.rect && this.frame_rect.width && this.frame_rect.height) {
        const frame = {
          left: (WINDOW_WIDTH - this.frame_rect.width) / 2
        };
        this.$refs.cheeks.style.width = `${this.frame_rect.width}px`;
        this.$refs.cheeks.style.height = `${this.frame_rect.height}px`;
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
      deep: true,
      handler(newValue, oldValue) {
        if (
          JSON.stringify(newValue) !== JSON.stringify(oldValue) &&
          Object.keys(newValue).length > 0
        ) {
          const _face = newValue.face;
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
          console.log("_points", _points);
          const textureImg = "cheek-sample.png";

          /* eslint-disable */
          drawFaceMask(_points, this.frame_rect, textureImg);
          /* eslint-enable */
        }
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
