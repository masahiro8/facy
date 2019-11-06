<template>
  <div class="videoFrame">
    <!-- 取り込むカメラ映像 -->
    <video id="srcVideo" class="video" ref="video" playsinline muted autoplay />
  </div>
</template>
<script>
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../../config";
import { adjustVideoSize } from "../../util/adjustVideoSize";

export default {
  name: "vid",
  data: () => {
    return {};
  },
  async mounted() {
    await this.initCamera(this.$refs.video);
    const info = adjustVideoSize(this.$refs.video);
    console.log("ready", info);
    this.$emit("ready", info);
  },
  methods: {
    //カメラを起動
    initCamera(video) {
      return new Promise((resolved, rejected) => {
        let media = navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: "user"
          }
        });
        media
          .then(stream => {
            video.muted = true;
            video.playsinline = true;
            video.onloadedmetadata = e => {
              resolved(true);
            };
            video.srcObject = stream;
          })
          .catch(err => {
            alert(err);
            rejected(false);
          });
      });
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