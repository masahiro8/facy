<template>
  <div ref="appframe" class="appframe">
    <div ref="inner" class="inner">
      <slot />
    </div>
  </div>
</template>
<script>
/**
 * 汎用的なアプリの外枠
 */
import * as _ from "lodash";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../config";
export default {
  data: () => {
    return {
      frame_rect: null,
      bottom: 0
    };
  },
  props: {
    rect: {
      type: Object,
      default: null
    }
  },
  components: {},
  mounted() {
    this.$nextTick(() => {
      this.frame_rect = this.$refs.appframe.getBoundingClientRect();
      this.layoutUpdate();
    });
  },
  methods: {
    //レイアウトを更新
    layoutUpdate() {
      if (this.rect && this.frame_rect) {
        const shift_left = (WINDOW_WIDTH - this.frame_rect.width) / 2;
        this.$refs.appframe.style.left = `${shift_left}px`;
      }
    }
  },
  watch: {
    rect: {
      immediate: true,
      handler(newValue, oldValue) {
        this.layoutUpdate();
      }
    }
  }
};
</script>
<style lang="scss">
.appframe {
  position: absolute;
  width: 375px;
  height: 100%;
  // height: 812px;
  overflow: hidden;
  .inner {
    position: relative;
    height: 100%;
  }
}
</style>
