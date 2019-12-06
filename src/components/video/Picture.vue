<template>
  <div ref="pictureFrame" class="pictureFrame">
    <LoadingOverlay :loading="loading" v-slot="{ context }">
      <canvas
        ref="image"
        class="overlay"
        :class="context"
        id="image"
        :width="canvas_rect.width + 'px'"
        :height="canvas_rect.height + 'px'"
      />
    </LoadingOverlay>
  </div>
</template>
<script>
import * as _ from "lodash";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../config";
import { adjustVideoSize } from "../../util/adjustVideoSize";
import { faceStore } from "../../services/faceStore";
import LoadingOverlay from "../loadingOverlay/LoadingOverlay";

export default {
  data: () => {
    return {
      loading: false,
      canvas_rect: {}
    };
  },
  mounted() {},
  props: {
    rect: Object,
    src: HTMLVideoElement
  },
  components: {
    LoadingOverlay
  },
  methods: {
    //撮影
    async shoot() {
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

      //basee64に変換
      const base64 = this.$refs.image.toDataURL("image/jpeg").split(",")[1];
      const result = await faceStore.uploadImage({
        face_image: base64
      });
      if (!result.result) {
        alert("通信エラー");
      }

      //仮通信
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    async getPoints() {}
  },
  watch: {
    src: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.src = newValue;
        }
      }
    },
    rect: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          console.log("picture rect", newValue);
          //フレーム
          const rect = this.$refs.pictureFrame.getBoundingClientRect();
          const frame = {
            left: (WINDOW_WIDTH - rect.width) / 2
          };
          // this.$refs.pictureFrame.style.left = `${frame.left}px`;
          this.$refs.image.style.left = `-${frame.left}px`;

          //画像
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
@import "./canvas.scss";
.pictureFrame {
  position: absolute;
  width: 375px;
  height: 100%;
  // height: 812px;
  overflow: hidden;
}
.overlay {
  &.is {
    filter: grayscale(0.5) blur(8px);
  }
}
.btn {
  position: absolute;
  z-index: 3;
}
</style>
