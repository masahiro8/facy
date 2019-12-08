<template>
  <div ref="productframe" class="productframe">
    <div ref="inner" class="inner" :class="isMove?'isMove':''">
      <!-- AreaSwipe -->
      <AreaSwipe @callback="getGesture">
        <!-- ここにスワイプしたコンポーネントを入れる -->
        <div class="area">
          <div class="products">
            <slot />
          </div>
          <ToggleButton @toggle="toggle()" :isOpen="isOpen" />
        </div>
      </AreaSwipe>
    </div>
  </div>
</template>
<script>
/**
 * スワイプして全体をスライドさせるコンポーネント
 */
import * as _ from "lodash";
import AreaSwipe, { GESTURE } from "../areaswipe/AreaSwipe";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../config";
import ToggleButton from "./CategoryToggleButton";

export default {
  data: () => {
    return {
      isMove: false,
      frame_rect: null,
      bottom: 0,
      limitTop: 86, //スライド上限
      limitBottom: 0, //スライド下限
      forceUp: 30, //強制的に開く値
      forceDown: 29, //強制的に閉じる値
      tmp_y: 0,
      isOpen: false
    };
  },
  props: {
    rect: Object
  },
  components: {
    AreaSwipe,
    ToggleButton
  },
  mounted() {
    this.frame_rect = this.$refs.productframe.getBoundingClientRect();
    this.layoutUpdate();
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      this.bottom = this.isOpen ? this.limitTop : this.limitBottom;
      this.$refs.inner.style.transform = `translateY(${-this.bottom}px)`;
    },
    //レイアウトを更新
    layoutUpdate() {
      if (this.rect && this.frame_rect) {
        const shift_left = (WINDOW_WIDTH - this.frame_rect.width) / 2;
        this.$refs.productframe.style.left = `${shift_left}px`;
      }
    },
    getGesture({ gesture, position }) {
      console.log(gesture, this.bottom);
      //開始
      if (gesture === GESTURE.START) {
        this.tmp_y = 0;
        this.isMove = true;
      }
      //停止
      if (gesture === GESTURE.END) {
        this.isMove = false;
      }

      //移動
      if (
        gesture === GESTURE.MOVING &&
        this.bottom < this.limitTop &&
        this.bottom > this.limitBottom
      ) {
        const move = position.y - this.tmp_y;
        this.bottom += move;
        this.$refs.inner.style.transform = `translateY(${-this.bottom}px)`;
        this.tmp_y = position.y;
      }
      if (this.bottom <= this.limitBottom) this.bottom = this.limitBottom + 1;
      if (this.bottom >= this.limitTop) this.bottom = this.limitTop - 1;

      //強制的に開く
      if (!this.isMove && this.bottom > this.forceUp) {
        this.bottom = this.limitTop - 1;
        this.$refs.inner.style.transform = `translateY(${-this.bottom}px)`;
        this.isOpen = true;
      }

      //強制的に閉じる
      if (!this.isMove && this.bottom < this.forceDown) {
        this.bottom = this.limitBottom + 1;
        this.$refs.inner.style.transform = `translateY(${-this.bottom}px)`;
        this.isOpen = false;
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
.productframe {
  position: absolute;
  width: 375px;
  height: 100%;
  overflow: hidden;

  .inner {
    position: relative;
    z-index: 99;
    height: 100%;
    transition: transform 0.2s ease-out;
    &.isMove {
      transition: none;
    }
  }
  .area {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 32px;
    // background-color: red;
    &:hover {
      cursor: pointer;
    }
  }

  .products {
    position: relative;
    width: 100%;
    height: auto;
    bottom: 160px;
  }
}
</style>
