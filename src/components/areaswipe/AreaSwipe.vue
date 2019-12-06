<template>
  <div
    class="area"
    v-touch:tap="tapHandler"
    v-touch:longtap="longtapHandler"
    v-touch:start="startHandler"
    v-touch:end="endHandler"
    v-touch:swipe.top="swipeTopHandler"
    v-touch:swipe.bottom="swipeBottomHandler"
    v-touch:swipe.left="swipeLeftHandler"
    v-touch:swipe.right="swipeRightHandler"
  >
    <slot />
  </div>
</template>
<script>
// vue2-touch-eventsをインポート
import Vue from "vue";
import Vue2TouchEvents from "vue2-touch-events";
Vue.use(Vue2TouchEvents);

export const GESTURE = {
  START: "start",
  END: "end",
  TAP: "tap",
  LONG_TAP: "long_tap",
  SWIPE_LEFT: "swipe_left",
  SWIPE_RIGHT: "swipe_right",
  SWIPE_TOP: "swipe_top",
  SWIPE_BOTTOM: "swipe_bottom",
  MOVING: "moving"
};

const moveEvent = func => {
  const moveStart = () => {
    window.addEventListener("mousemove", func);
    window.addEventListener("touchmove", func);
  };

  const moveEnd = () => {
    window.removeEventListener("mousemove", func);
    window.removeEventListener("touchmove", func);
  };

  return {
    moveStart,
    moveEnd
  };
};

export default {
  data: () => {
    return {
      isMove: false,
      startPoint: { x: 0, y: 0 },
      movePoint: { x: 0, y: 0 },
      //イベント
      pointer: null
    };
  },
  mounted() {
    this.pointer = moveEvent(this.update);
  },
  methods: {
    update(e) {
      this.movePoint = {
        x: e.pageX - this.startPoint.x,
        y: this.startPoint.y - e.pageY
      };
      this.callback(GESTURE.MOVING);
    },
    startHandler(e) {
      this.startPoint = { x: e.pageX, y: e.pageY };
      this.callback(GESTURE.START);
      this.pointer.moveStart();
    },
    endHandler() {
      this.callback(GESTURE.END);
      this.pointer.moveEnd();
    },
    tapHandler() {
      this.callback(GESTURE.TAP);
    },
    longtapHandler() {
      this.callback(GESTURE.LONG_TAP);
    },
    swipeLeftHandler() {
      this.callback(GESTURE.SWIPE_LEFT);
    },
    swipeRightHandler() {
      this.callback(GESTURE.SWIPE_RIGHT);
    },
    swipeTopHandler() {
      this.callback(GESTURE.SWIPE_TOP);
    },
    swipeBottomHandler() {
      this.callback(GESTURE.SWIPE_BOTTOM);
    },
    callback(gesture) {
      this.$emit("callback", { gesture, position: this.movePoint });
    }
  }
};
</script>
<style lang="scss">
.area {
  display: inline-block;
}
</style>
