<template>
  <canvas
    ref="canvas"
    class="overlay"
    :style="getStyle"
    :width="canvas_rect.width + 'px'"
    :height="canvas_rect.height + 'px'"
  />
</template>
<script>
export default {
  data: () => {
    return {
      canvas_rect: {}
    };
  },
  mounted() {},
  props: {
    rect: Object,
    points: Object,
    zIndex: {
      type: Number,
      default: 3
    }
  },
  methods: {
    draw() {}
  },
  watch: {
    points: {
      immediate: true,
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          this.draw();
        }
      }
    },
    rect: {
      immediate: true,
      handler(newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
          const _width = newValue.width - newValue.x * 2;
          this.canvas_rect = {
            width: _width,
            height: newValue.height
          };
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
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  transform: scale(-1, 1);
}
</style>
