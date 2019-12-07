<template>
  <div ref="area" class="area">
    <slot />
  </div>
</template>
<script>
// vue2-touch-eventsは使えないので却下
import Vue from "vue";

export const GESTURE = {
  START: "start",
  END: "end",
  MOVING: "moving"
};

const moveEvent = initFunc => {
  let func = initFunc;

  const moveStart = _func => {
    window.addEventListener("mousedown", _func);
    window.addEventListener("touchstart", _func);
  };

  const moveUpdate = () => {
    window.addEventListener("mousemove", func);
    window.addEventListener("touchmove", func);
  };

  //領域外での終了を検出
  const moveEndAll = _func => {
    const end = () => {
      func = null;
      _func();
    };
    window.addEventListener("mouseup", end);
    window.addEventListener("touchend", end);
  };

  const moveRelease = () => {
    window.removeEventListener("mousemove", func);
    window.removeEventListener("touchmove", func);
  };

  return {
    moveStart,
    moveRelease,
    moveEndAll,
    moveUpdate
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
    this.pointer = moveEvent(this.updateHandler);
    this.initHandler();
  },
  methods: {
    initHandler() {
      this.pointer.moveStart(e => {
        // console.log("Start");
        const point = { x: e.pageX, y: e.pageY };
        if (this.getRectHit(point)) {
          this.startHandler();
          this.isMove = true;
          this.startPoint = { x: e.pageX, y: e.pageY };
        }
      });
      this.pointer.moveUpdate();
      this.pointer.moveEndAll(() => {
        this.isMove = false;
        this.callback(GESTURE.END);
      });
    },

    startHandler() {
      this.callback(GESTURE.START);
    },

    updateHandler(e) {
      if (!this.isMove) return;
      this.movePoint = {
        x: e.pageX - this.startPoint.x,
        y: this.startPoint.y - e.pageY
      };
      this.callback(GESTURE.MOVING);
    },

    endHandler() {
      this.callback(GESTURE.END);
    },

    callback(gesture) {
      this.$emit("callback", { gesture, position: this.movePoint });
    },
    getRectHit(point) {
      const rect = this.$refs.area.getBoundingClientRect();
      console.log("area", rect, point);
      if (
        rect.x < point.x &&
        rect.y < point.y &&
        rect.y + rect.height > point.y &&
        rect.x + rect.width > point.x
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>
<style lang="scss">
.area {
  display: inline-block;
}
</style>
