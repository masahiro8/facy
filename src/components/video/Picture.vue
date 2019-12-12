<template>
  <div ref="pictureFrame" class="pictureFrame">
    <LoadingOverlay :loading="loading" v-slot="{ context }">
      <canvas
        v-if="frame_rect"
        ref="image2"
        class="clopImage"
        :class="context"
        id="image2"
        :width="frame_rect.width"
        :height="frame_rect.height"
      />
    </LoadingOverlay>
  </div>
</template>
<script>
import * as _ from "lodash";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../config";
import { adjustVideoSize } from "../../util/adjustVideoSize";
import { faceStore, FACE_STORE_CONTEXT_KEYS } from "../../services/faceStore";
import { ContextStore } from "../../context/Store";
import LoadingOverlay from "../loadingOverlay/LoadingOverlay";

export default {
  data: () => {
    return {
      loading: false,
      frame_rect: null
    };
  },
  mounted() {
    this.frame_rect = this.$refs.pictureFrame.getBoundingClientRect();
    this.layoutUpdate();
  },
  props: {
    rect: Object,
    src: HTMLVideoElement
  },
  components: {
    LoadingOverlay
  },
  methods: {
    //レイアウト更新
    layoutUpdate() {
      if (this.rect && this.frame_rect) {
        this.frame_rect.shift_left = (WINDOW_WIDTH - this.frame_rect.width) / 2;
      }
    },
    clearCanvas() {
      const ctx_img2 = this.$refs.image2.getContext("2d");
      ctx_img2.clearRect(0, 0, this.frame_rect.width, this.frame_rect.height);
    },
    //撮影
    async shoot() {
      //頂点情報を削除
      ContextStore.setContext(FACE_STORE_CONTEXT_KEYS.EYES, {});

      //仮通信
      this.loading = true;

      const rects2 = {
        sx: (this.rect.x + this.frame_rect.shift_left) / this.rect.rate,
        sy: 0,
        sw: this.frame_rect.width / this.rect.rate,
        sh: this.frame_rect.height / this.rect.rate,
        dx: 0,
        dy: 0,
        dw: this.frame_rect.width,
        dh: this.frame_rect.height
      };

      //video(this.src)画像をoverlayに描画
      const ctx_img2 = this.$refs.image2.getContext("2d");
      ctx_img2.clearRect(0, 0, this.frame_rect.width, this.frame_rect.height);
      ctx_img2.save();
      ctx_img2.drawImage(
        this.src,
        rects2.sx,
        rects2.sy,
        rects2.sw,
        rects2.sh,
        rects2.dx,
        rects2.dy,
        rects2.dw,
        rects2.dh
      );

      //basee64に変換
      const base64 = this.$refs.image2.toDataURL("image/jpeg").split(",")[1];
      const result = await faceStore.uploadImage({
        face_image: base64
      });
      if (!result.result) {
        alert("通信エラー");
      }

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  },
  watch: {
    rect: {
      immediate: true,
      handler(newValue) {
        this.layoutUpdate();
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
  overflow: hidden;
}

.clopImage {
  position: absolute;
  width: 375px;
  height: 100%;
  left: 0;
  top: 0;
  transition: filter 0.5s;
  transform: scale(-1, 1);
  z-index: 2;
  filter: grayscale(0) blur(0);
  &.is {
    filter: grayscale(0.5) blur(8px);
  }
}

.btn {
  position: absolute;
  z-index: 3;
}
</style>
