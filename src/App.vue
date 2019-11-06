<template>
  <div id="app">
    <!-- 動画 -->
    <Vid @ready="readyVideo" />
    <!-- 撮影した写真を表示 -->
    <Overlay ref="overlay" :src="src" :rect="rect" @callbackPoints="getPoints" />
    <!-- 撮影ボタン -->
    <Shoot @shoot="shoot" />
    <!-- フラッシュ -->
    <div v-if="onFlash" id="white"></div>
  </div>
</template>

<script>
import Vid from "./components/video/Video";
import Overlay from "./components/video/Overlay";
import Shoot from "./components/shoot/Shoot";
import { wait } from "./util/wait";

export default {
  name: "app",
  data: () => {
    return {
      src: null,
      rect: {},
      onFlash: false
    };
  },
  components: {
    Vid,
    Shoot,
    Overlay
  },
  mounted() {},
  methods: {
    readyVideo(value) {
      this.rect = value.rect;
      this.src = value.src;
    },
    async shoot() {
      this.onFlash = true;
      await wait(100);
      this.$refs.overlay.shoot();
      await wait(300);
      this.onFlash = false;
    },
    getPoints(points) {
      console.log("points", points);
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#white {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 99;
}
</style>
