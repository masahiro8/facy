<template>
  <div id="app">
    <Header />
    <!-- 動画 -->
    <Vid @ready="readyVideo" />
    <!-- 撮影した写真を表示 -->
    <Picture
      ref="picture"
      :src="src"
      :rect="rect"
      @callbackPoints="getPoints"
    />
    <ContextConsumer :contextKey="[FACE_POINTS]" v-slot="{ context }">
      <!-- 目 -->
      <Eyes :rect="rect" :points="context[FACE_POINTS]" :zIndex="4" />
    </ContextConsumer>
    <!-- 撮影ボタン -->
    <Shoot v-if="!shooted" @shoot="shoot" />

    <!-- 商品リスト -->
    <div v-if="shooted" class="select-lens-area">
      <ProductList :items="products" @setLensColor="setLensColor" />
      <ToggleButton @toggle="show = !show" :isOpen="show" />
      <transition name="slide-fade">
        <CategoryList :items="categories" v-if="show" />
      </transition>
    </div>
    <!-- フラッシュ -->
    <div v-if="onFlash" id="white"></div>
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Vid from "./components/video/Video";
import Picture from "./components/video/Picture";
import Shoot from "./components/shoot/Shoot";
import ProductList from "./components/products/ProductList.vue";
import ToggleButton from "./components/button/CategoryToggleButton.vue";
import CategoryList from "./components/category/CategoryList.vue";
import { wait } from "./util/wait";
import { FACE_STORE_CONTEXT_KEYS } from "./services/faceStore";
import ContextConsumer from "./context/Context";
import { Eyes } from "./components/faceOverlay/Eyes";

export default {
  name: "app",
  data: () => {
    return {
      src: null,
      rect: {},
      points: {},
      onFlash: false,
      shooted: false,
      show: false,
      lensColor: null,
      products: [],
      categories: [],
      FACE_POINTS: FACE_STORE_CONTEXT_KEYS
    };
  },
  components: {
    Header,
    Vid,
    Shoot,
    Picture,
    ProductList,
    ToggleButton,
    CategoryList,
    ContextConsumer,
    Eyes
  },
  mounted() {},
  methods: {
    readyVideo(value) {
      console.log("readyVideo", value.rect);
      this.rect = value.rect;
      this.src = value.src;
    },
    //カメラ撮影
    async shoot() {
      this.onFlash = true;
      await wait(100);
      this.$refs.picture.shoot();
      await wait(240);
      this.onFlash = false;
      this.shooted = true;
    },
    //ここで両目の頂点情報を取得
    getPoints(points, face_eyes_data) {
      this.points = {
        eyes: points,
        face: face_eyes_data.points,
        shift: face_eyes_data.shift,
        rate: face_eyes_data.rate
      };
      console.log("points", points, face_eyes_data);
    },
    setLensColor(id) {
      this.id = id;
      // console.log("set lens0" + id);
      return this.id;
    }
  }
};
</script>

<style lang="scss">
@import "@/style/ress.scss";
@import "@/style/config.scss";
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

body {
  text-align: center;
  font-family: "Roboto", sans-serif;
  color: $color-base-10;
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

.select-lens-area {
  z-index: 10;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
// .slide-fade-leave-active {
//   transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 0.5);
// }
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
