<template>
  <div ref="appframe" class="appframe">
    <div ref="inner" class="inner">
      <slot />
    </div>
    <!-- AreaSwipe -->
    <AreaSwipe @callback="getGesture">
      <!-- ここにスワイプしたコンポーネントを入れる -->
      <div class="area" />
    </AreaSwipe>
  </div>
</template>
<script>
/**
 * [[実装中]]
 * スワイプして全体をスライドさせるコンポーネント
 */
import * as _ from "lodash";
import AreaSwipe, { GESTURE } from "../areaswipe/AreaSwipe";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../config";
export default {
  data: () => {
    return {
      bottom: 0,
      limitTop: 64,
      limitBottom: -64
    };
  },
  props: {
    rect: Object
  },
  components: {
    AreaSwipe
  },
  methods: {
    getGesture({ gesture, position }) {
      console.log(gesture, position.y);
      //移動
      if (gesture === GESTURE.MOVING) {
        this.bottom = position.y;
        this.$refs.inner.style.bottom = `${this.bottom}px`;
      }
    }
  },
  watch: {
    rect: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          //フレーム
          const rect = this.$refs.appframe.getBoundingClientRect();
          const frame = {
            left: (WINDOW_WIDTH - rect.width) / 2
          };
          this.$refs.appframe.style.left = `${frame.left}px`;
          console.log("productframe rect", newValue, rect);
        }
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
  .area {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 120px;
    z-index: 2;
    // background-color: red;
  }
}
</style>
