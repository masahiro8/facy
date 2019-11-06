<template>
  <div>
    <canvas
      ref="image"
      class="overlay"
      id="image"
      :width="pix(canvas_rect.width)"
      :height="pix(canvas_rect.height)"
    />
    <canvas
      ref="overlay"
      class="overlay"
      id="overlay"
      :width="pix(canvas_rect.width)"
      :height="pix(canvas_rect.height)"
      :class="showDetection?'show':'hide'"
    />
    <div class="btn">
      visible
      <input type="checkbox" @change="toggle" />
    </div>
  </div>
</template>
<script>
import * as _ from "lodash";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../config";
import { face } from "../../util/face";
import { adjustVideoSize } from "../../util/adjustVideoSize";

export default {
  data: () => {
    return {
      showDetection: false,
      canvas_rect: {}
    };
  },
  mounted() {
    console.log("overlay mounted");
  },
  props: {
    rect: Object,
    src: HTMLVideoElement
  },
  methods: {
    toggle(e) {
      this.showDetection = !this.showDetection;
    },
    //撮影
    shoot() {
      console.log("shoot");
      const size = {
        w: this.canvas_rect.width,
        h: this.canvas_rect.height
      };

      const rects = {
        sx: this.rect.x / this.rect.rate,
        sy: 0,
        sw: size.w / this.rect.rate,
        sh: size.h / this.rect.rate,
        dx: 0,
        dy: 0,
        dw: WINDOW_WIDTH,
        dh: WINDOW_HEIGHT
      };

      //ここから画像処理用オーバーレイ
      //video(this.src)画像をoverlayに描画
      const ctx = this.$refs.overlay.getContext("2d");
      ctx.clearRect(0, 0, this.canvas_rect.width, this.canvas_rect.height);
      ctx.save();
      ctx.drawImage(
        this.src,
        rects.sx,
        rects.sy,
        rects.sw,
        rects.sh,
        0,
        0,
        rects.dw,
        rects.dh
      );
      ctx.restore();

      //ここから顔画像
      //video(this.src)画像をoverlayに描画
      const ctx_img = this.$refs.image.getContext("2d");
      ctx_img.clearRect(0, 0, this.canvas_rect.width, this.canvas_rect.height);
      ctx_img.save();
      ctx_img.drawImage(
        this.src,
        rects.sx,
        rects.sy,
        rects.sw,
        rects.sh,
        0,
        0,
        rects.dw,
        rects.dh
      );
      ctx_img.restore();
      this.faceDetect();
    },
    pix(n) {
      return n + "px";
    },
    async faceDetect() {
      //ここで頂点を取得
      const points = await face.getEyesPoints();
      //リサイズ
      const _width = this.rect.width - this.rect.x * 2;
      this.canvas_rect = {
        width: _width,
        height: this.rect.height
      };
      console.log("faceDetect");
      this.$emit("callbackPoints", points);
    }
  },
  watch: {
    src: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.src = newValue;
          //faceAPiに取得用imageと描画用canvasを渡す
          face.init(this.$refs.image, this.$refs.overlay);
        }
      }
    },
    rect: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue && this.$refs.overlay) {
          const _width = newValue.width - newValue.x * 2;
          this.canvas_rect = {
            width: _width,
            height: newValue.height
          };
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.overlay {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  transform: scale(-1, 1);
  &.show {
    visibility: visible;
  }
  &.hide {
    visibility: hidden;
  }
}
.btn {
  position: absolute;
  z-index: 3;
}
</style>