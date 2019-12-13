<template>
  <div ref="overlayFrame" class="overlayFrame eyelush">
    <canvas
      ref="eyelush"
      id="eyelush"
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
      this.clearCanvas();
    });
  },

  methods: {
    draw(points) {
      const drawMask = (canvas, points) => {
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          if (i == 0) {
            ctx.moveTo(points[i][0], points[i][1]);
          } else {
            ctx.lineTo(points[i][0], points[i][1]);
          }
        }
        ctx.closePath();
        ctx.fill();
      };

      const drawCenter = (canvas, arr) => {
        const center = {
          x: arr[0],
          y: arr[1]
        };
        var circle = new Path2D();
        circle.moveTo(arr[0], arr[1]);
        circle.arc(arr[0], arr[1], arr[2], 0, 2 * Math.PI);
        const ctx = canvas.getContext("2d");
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.beginPath();
        ctx.fill(circle);
        ctx.restore();
      };

      drawMask(this.$refs.eyelush);
      drawCenter(this.$refs.eyelush);
    },
    //キャンバスクリア
    clearCanvas() {
      const clearCanvasRect = canvas => {
        const ctx = canvas.getContext("2d");
        ctx.restore();
        console.log(
          "clear eyelush",
          this.frame_rect.width,
          this.frame_rect.height
        );
        ctx.clearRect(0, 0, this.frame_rect.width, this.frame_rect.height);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();
      };
      clearCanvasRect(this.$refs.eyelush);
    },
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
    rect: {
      immediate: true,
      handler() {
        this.layoutUpdate();
      }
    },
    points: {
      // immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (
          JSON.stringify(newValue) !== JSON.stringify(oldValue) &&
          Object.keys(newValue).length > 0
        ) {
          const right = newValue.eyes.right.eyelid;
          const left = newValue.eyes.left.eyelid;

          const textureImg = "wireframe.png";

          const drawEyelid = (canvas, points) => {
            console.log("points", points);

            const rect = canvas.getBoundingClientRect();
            const ctx = canvas.getContext("2d");
            ctx.save();
            ctx.globalCompositeOperation = "source-over";
            ctx.strokeStyle = "rgb(200,200,200)";
            ctx.beginPath();
            for (let i = 0; i < points.length; i++) {
              if (i == 0) {
                ctx.moveTo(points[i][0], points[i][1]);
              } else {
                ctx.lineTo(points[i][0], points[i][1]);
              }
            }
            ctx.closePath();
            ctx.stroke();
          };
          drawEyelid(this.$refs.eyelush, right);
          drawEyelid(this.$refs.eyelush, left);

          /* eslint-disable */
          // drawFaceMask(_points, this.frame_rect, textureImg);
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
  // mix-blend-mode: multiply;
  // mix-blend-mode: luminosity;
}
</style>
