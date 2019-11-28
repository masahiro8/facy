<template>
  <div class="photo-shoot">
    <Header />
    <div class="content">
      <!-- 動画 -->
      <Vid @ready="readyVideo" />
      <!-- 撮影した写真を表示 -->
      <Overlay ref="overlay" :src="src" :rect="rect" />
    </div>
    <div class="button-area"><ShootButton @shoot="shoot" /></div>
  </div>
</template>

<script>
import { wait } from "../util/wait";
import Header from "../components/header/Header.vue";
import Vid from "../components/video/Video.vue";
import Overlay from "../components/video/Overlay.vue";
import ShootButton from "../components/button/ShootButton.vue";
export default {
  data: () => {
    return {
      src: null,
      rect: {},
      points: {},
      onFlash: false
    };
  },
  components: {
    Header,
    Vid,
    Overlay,
    ShootButton
  },
  methods: {
    readyVideo(value) {
      this.rect = value.rect;
      this.src = value.src;
    },
    //カメラ撮影
    async shoot() {
      this.onFlash = true;
      await wait(100);
      this.$refs.overlay.shoot();
      await wait(300);
      this.onFlash = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";

.photo-shoot {
  height: 100vh;
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 138px);
  overflow: hidden;
}

.button-area {
  padding-bottom: 50px;
  width: 100%;
}
</style>
