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
    draw(points) {},
    //キャンバスクリア
    clearCanvas() {},
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
          console.log(right);
          console.log(left);

          const textureImg = "wireframe_eyelush.png";

          /* eslint-disable */
          // drawEyelush(right, this.frame_rect, textureImg);
          drawEyelush({ right, left }, this.frame_rect, textureImg);
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
