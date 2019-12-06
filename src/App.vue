<template>
  <div id="app">
    <Header />
    <AppFrame :rect="rect">
      <!-- 動画 -->
      <Vid @ready="readyVideo" />
      <!-- 撮影した写真を表示 -->
      <Picture ref="picture" :src="src" :rect="rect" @callbackPoints="getPoints" />
      <ContextConsumer :contextKey="[POINTS_KEY,'PRODUCT_ID','PRODUCTS']" v-slot="{ context }">
        <!-- 目 -->
        <Eyes
          :rect="rect"
          :products="context['PRODUCTS']"
          :points="context[POINTS_KEY]"
          :productId="context['PRODUCT_ID']"
          :zIndex="4"
        />
      </ContextConsumer>
    </AppFrame>
    <!-- 撮影ボタン -->
    <Shoot v-if="!shooted" @shoot="shoot" />
    <!-- 商品リスト -->
    <ProductFrame :rect="rect">
      <div v-if="shooted" class="select-lens-area">
        <ProductList :productType="PRODUCT_TYPE.LENS" @setProductId="setProductId" />
        <!-- とりあえずカテゴリは非表示 -->
        <!-- <ToggleButton @toggle="show = !show" :isOpen="show" /> -->
        <transition name="slide-fade">
          <CategoryList :items="categories" v-if="show" />
        </transition>
      </div>
    </ProductFrame>
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
// import ToggleButton from "./components/button/CategoryToggleButton.vue";
import CategoryList from "./components/category/CategoryList.vue";
import { wait } from "./util/wait";
import { FACE_STORE_CONTEXT_KEYS } from "./services/faceStore";
import ContextConsumer from "./context/Context";
import { ContextStore } from "./context/Store";
import Eyes from "./components/faceOverlay/Eyes.vue";
import AppFrame from "./components/frame/AppFrame";
import ProductFrame from "./components/frame/ProductFrame";
import { PRODUCT_TYPE } from "./constants";

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
      POINTS_KEY: FACE_STORE_CONTEXT_KEYS.EYES,
      PRODUCT_TYPE: PRODUCT_TYPE
    };
  },
  components: {
    Header,
    AppFrame,
    ProductFrame,
    Vid,
    Shoot,
    Picture,
    ProductList,
    // ToggleButton,
    CategoryList,
    ContextConsumer,
    Eyes
  },
  mounted() {},
  methods: {
    readyVideo(value) {
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
    },
    setProductId({ productId, productType }) {
      ContextStore.setContext("PRODUCT_ID", { productId });
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
  position: absolute;
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
