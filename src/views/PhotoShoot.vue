<template>
  <div class="photo-shoot">
    <Header />
    <div class="content">
      <div class="eyes-position">
        <EyesPosition color="white" />
      </div>
      <!-- 動画 -->
      <Vid @ready="readyVideo" />
      <!-- 撮影した写真を表示 -->
      <Overlay ref="overlay" :src="src" :rect="rect" />
      <div class="button-area"><ShootButton @shoot="shoot" /></div>
    </div>
  </div>
</template>

<script>
import { wait } from "../util/wait";
import Header from "../components/header/Header.vue";
import EyesPosition from "../components/EyesPosition.vue";
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
    EyesPosition,
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
  height: calc(100% - 38px);
  overflow: hidden;
}

.eyes-position {
  z-index: 10;
}

.button-area {
  position: absolute;
  bottom: 0;
  z-index: 10;
  padding-bottom: 50px;
  width: 100%;
}
</style>
