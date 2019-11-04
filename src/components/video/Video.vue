<template>
  <div class="videoFrame">
    <!-- 取り込むカメラ映像 -->
    <video id="srcVideo" class="video" ref="video" playsinline muted autoplay />
  </div>
</template>
<script>
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../config";

export default {
  name: "vid",
  data: () => {
    return {
      video: null,
      video_window_rate: 1,
      video_size: { w: 0, h: 0 },
      video_rect: {}
    };
  },
  async mounted() {
    this.video = this.$refs.video;
    await this.initCamera();
    const rect = this.adjustVideoSize();
    this.$emit("ready", rect);
  },
  methods: {
    //カメラを起動
    initCamera() {
      return new Promise((resolved, rejected) => {
        let media = navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        });
        media
          .then(stream => {
            this.video.muted = true;
            this.video.playsinline = true;
            this.video.onloadedmetadata = e => {
              this.video_size = {
                w: this.video.videoWidth,
                h: this.video.videoHeight
              };
              this.video_window_rate = WINDOW_HEIGHT / this.video_size.h;
              resolved(true);
            };
            this.video.srcObject = stream;
          })
          .catch(err => {
            alert(err);
            rejected(false);
          });
      });
    },

    //ビデオを画面サイズに合わせる
    adjustVideoSize() {
      const size = {
        w: this.video_size.w * this.video_window_rate,
        h: WINDOW_HEIGHT
      };
      const left = (size.w - WINDOW_WIDTH) / 2;
      const top = (size.h - WINDOW_HEIGHT) / 2;

      this.video.width = size.w;
      this.video.height = size.h;
      this.video.style.width = size.w + "px";
      this.video.style.height = size.h + "px";
      this.video.style.left = -left + "px";
      this.video.style.top = -top + "px";

      console.log(
        "this.video_window_rate",
        this.video_window_rate,
        "this.video_size.w",
        this.video_size.w,
        "WINDOW_WIDTH",
        WINDOW_WIDTH,
        "size.w",
        size.w,
        "size.w - WINDOW_WIDTH",
        size.w - WINDOW_WIDTH,
        "left",
        left
      );

      this.video_rect = {
        x: left,
        y: top,
        width: size.w,
        height: size.h,
        rate: this.video_window_rate
      };
      return {
        src: this.video,
        rect: this.video_rect
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.video {
  position: relative;
  left: 0;
  top: 0;
  z-index: 1;
  // filter: brightness(130%) saturate(80%);
  transform: scale(-1, 1);
}

.videoFrame {
  position: absolute;
  width: 375px;
  height: 812px;
  overflow: hidden;
}
</style>