<template>
  <div id="app">
    <Header>
      <template v-slot:left></template>
      <template v-slot:right></template>
    </Header>
    <AppFrame :rect="rect">
      <!-- 動画 -->
      <Vid @ready="readyVideo" />
      <!-- 撮影した写真を表示 -->
      <Picture ref="picture" :src="src" :rect="rect" />
      <ContextConsumer
        :contextKey="[POINTS_KEY.EYES, 'PRODUCT_ID', 'PRODUCTS']"
        v-slot="{ context }"
      >

        <!-- 顔のメッシュ -->
        <FaceMesh
          v-if="shooted"
          ref="mesh"
          :rect="rect"
          :points="context[POINTS_KEY.EYES]"
          :zIndex="5"
        />

        <!-- 目 -->
        <Eyes
          v-if="shooted"
          ref="eyes"
          :rect="rect"
          :products="context['PRODUCTS']"
          :productId="context['PRODUCT_ID']"
          :points="context[POINTS_KEY.EYES]"
          :zIndex="4"
        />

        <!-- チーク -->
        <Cheeks
          v-if="shooted"
          ref="cheeks"
          :rect="rect"
          :products="context['PRODUCTS']"
          :productId="context['PRODUCT_ID']"
          :points="context[POINTS_KEY.EYES]"
          :zIndex="6"
        />

        <!-- アイシャドウ -->
        <Eyeshadows
          v-if="shooted"
          ref="eyeshadows"
          :rect="rect"
          :products="context['PRODUCTS']"
          :productId="context['PRODUCT_ID']"
          :points="context[POINTS_KEY.EYES]"
          :zIndex="7"
        />

        <!-- リップ -->
        <Lips
          v-if="shooted"
          ref="lips"
          :rect="rect"
          :products="context['PRODUCTS']"
          :productId="context['PRODUCT_ID']"
          :points="context[POINTS_KEY.EYES]"
          :zIndex="8"
        />

      </ContextConsumer>      

    </AppFrame>
    <!-- 撮影ボタン -->
    <Shoot v-if="!shooted" @shoot="shoot" />
    <!-- 商品リスト -->
    <ProductFrame v-if="shooted" :rect="rect">
      <!-- プロダクトリスト -->
      <!-- cssで一つ分しか表示されていないが出力はされている -->
      <div v-for="(_type, index) in PRODUCT_TYPE" v-bind:key="index">
        <transition name="product-fade">
          <div v-if="shooted" class="products-list">
            <ContextConsumer
              :contextKey="['PRODUCTS', 'CATEGORY']"
              v-slot="{ context }"
            >
                <!-- プロダクト -->
                <ProductList
                  :productType="_type"
                  :products="context['PRODUCTS']"
                  :categoryId="context['CATEGORY']"
                  @setProductId="setProductId"
                />
                <!-- カテゴリ -->
                <transition name="slide-fade">
                  <CategoryList
                    :productType="_type"
                    :items="context['PRODUCTS']"
                  />
                </transition>

            </ContextConsumer>
          </div>
        </transition>
      </div>
    </ProductFrame>
    <AppFrame :rect="rect">
      <!-- 写真消すボタン -->
      <Clear v-if="shooted" @action="clearPicture" />
    </AppFrame>

    <!-- フラッシュ -->
    <div v-if="onFlash" id="white"></div>
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Vid from "./components/video/Video";
import Picture from "./components/video/Picture";
import Shoot from "./components/button/Shoot";
import Clear from "./components/button/Clear";
import ProductList from "./components/products/ProductList.vue";
import CategoryList from "./components/category/CategoryList.vue";
import { wait } from "./util/wait";
import { FACE_STORE_CONTEXT_KEYS } from "./services/faceStore";
import ContextConsumer from "./context/Context";
import { ContextStore } from "./context/Store";
import Eyes from "./components/faceOverlay/Eyes.vue";
import FaceMesh from "./components/faceOverlay/FaceMesh.vue";
import Cheeks from "./components/faceOverlay/Cheeks.vue";
import Eyeshadows from "./components/faceOverlay/Eyeshadows.vue";
import Lips from "./components/faceOverlay/Lips.vue";
import AppFrame from "./components/frame/AppFrame";
import ProductFrame from "./components/frame/ProductFrame";
import { PRODUCT_TYPE } from "./constants";
import { productapi } from "./services/api";

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
      POINTS_KEY: FACE_STORE_CONTEXT_KEYS,
      PRODUCT_TYPE: PRODUCT_TYPE
    };
  },
  components: {
    Header,
    AppFrame,
    ProductFrame,
    Vid,
    Shoot,
    Clear,
    Picture,
    ProductList,
    CategoryList,
    ContextConsumer,
    Eyes,
    FaceMesh,
    Cheeks,
    Eyeshadows,
    Lips
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    readyVideo(value) {
      console.log(value);
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
    //画像を非表示
    clearPicture() {
      this.shooted = false;
      //選択を解除
      ContextStore.setContext("CATEGORY", { id: null });
      ContextStore.setContext("PRODUCT_ID", { productId: null });
      //各コンポーネントをprops経由でリセットするとworkしないので直接メソッドからリセット
      this.$refs.picture.clearCanvas();
      this.$refs.eyes.clearCanvas();
    },
    setProductId({ productId, productType }) {
      ContextStore.setContext("PRODUCT_ID", { productId });
    },
    async getProducts() {
      const result = await productapi.get("", {});
      console.log("getProducts", result.data);
      ContextStore.setContext("PRODUCTS", result.data);
    },
    toggleShow(part) {
      this.faceParts[part] = !this.faceParts[part];
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

.products-list {
  position: absolute;
  width: 100%;
  // z-index: 10;
  // bottom: -84px;
}

.list {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 64px;
  widows: 100%;
  background-color: red;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.product-fade-enter-active,
.product-fade-leave-active {
  transition: transform 0.1s;
}
.product-fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(64px);
}
</style>
