<template>
  <div ref="overlayFrame" class="overlayFrame">
    <canvas
      ref="canvas_left"
      class="overlay"
      :style="getStyle"
      :width="frame_rect.width + 'px'"
      :height="frame_rect.height + 'px'"
    />
    <canvas
      ref="canvas_right"
      class="overlay"
      :style="getStyle"
      :width="frame_rect.width + 'px'"
      :height="frame_rect.height + 'px'"
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
      },
      product: null,
      lens_image: "",
      canvas_rect: {}
    };
  },

  mounted() {
    this.frame_rect = this.$refs.overlayFrame.getBoundingClientRect();
    this.layoutUpdate();
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
    }
  },

  methods: {
    draw({ left, right }, image) {
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

      const drawImage = (canvas, arr, path) => {
        const rect = {
          x: arr[0] - arr[2],
          y: arr[1] - arr[2],
          width: arr[2] * 2,
          height: arr[2] * 2
        };
        const lens = new Image();
        lens.onload = () => {
          const ctx = canvas.getContext("2d");
          ctx.globalCompositeOperation = "source-in";
          ctx.drawImage(lens, rect.x, rect.y, rect.width, rect.height);
          ctx.restore();
        };
        lens.src = path;
      };

      drawMask(this.$refs.canvas_left, left.eyelid);
      drawCenter(this.$refs.canvas_left, left.pupil);
      if (image) {
        drawImage(this.$refs.canvas_left, left.pupil, image);
      }
      drawMask(this.$refs.canvas_right, right.eyelid);
      drawCenter(this.$refs.canvas_right, right.pupil);
      if (image) {
        drawImage(this.$refs.canvas_right, right.pupil, image);
      }
    },
    layoutUpdate() {
      if (this.rect && this.frame_rect.width && this.frame_rect.height) {
        const frame = {
          left: (WINDOW_WIDTH - this.frame_rect.width) / 2
        };
        this.$refs.canvas_left.style.width = `${this.frame_rect.width}px`;
        this.$refs.canvas_left.style.height = `${this.frame_rect.height}px`;
        this.$refs.canvas_right.style.width = `${this.frame_rect.width}px`;
        this.$refs.canvas_right.style.height = `${this.frame_rect.height}px`;

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
    productId: {
      immediate: true,
      handler(newValue, oldValue) {
        const product = _.find(this.products, product => {
          return product.id === newValue.productId;
        });
        if (product) {
          this.product = product;
          this.lens_image = `${window.location.origin}/images/${product.category}/${product.image}`;
          this.draw(this.points.eyes, this.lens_image);
        }
      }
    },
    rect: {
      immediate: true,
      handler(newValue, oldValue) {
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
  mix-blend-mode: soft-light;
}
</style>
