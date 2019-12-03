<template>
  <div id="app">
    <Header />
    <!-- 動画 -->
    <Vid @ready="readyVideo" />
    <!-- 撮影した写真を表示 -->
    <Overlay
      ref="overlay"
      :src="src"
      :rect="rect"
      @callbackPoints="getPoints"
    />
    <!-- コンタクトレンズ -->
    <Eyes :src="src" :rect="rect" :points="points" left_right="left" />
    <Eyes :src="src" :rect="rect" :points="points" left_right="right" />
    <!-- 撮影ボタン -->
    <Shoot v-if="!shooted" @shoot="shoot" />

    <!-- 商品リスト -->
    <div v-if="shooted" class="select-lens-area">
      <ProductList :items="products" />
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
import Overlay from "./components/video/Overlay";
import Shoot from "./components/shoot/Shoot";
import Eyes from "./components/video/Eyes";
import ProductList from "./components/products/ProductList.vue";
import ToggleButton from "./components/button/CategoryToggleButton.vue";
import CategoryList from "./components/category/CategoryList.vue";
import { wait } from "./util/wait";

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
      products: [
        {
          id: 1,
          category: "candy",
          color: "brown mariage",
          image: "lens01_brownmariage.png",
          url: "http://backham.me/"
        },
        {
          id: 2,
          category: "candy",
          color: "sheer lueur",
          image: "lens02_sheerlueur.png",
          url: "http://backham.me/"
        },
        {
          id: 3,
          category: "candy",
          color: "innocent glam",
          image: "lens03_innocentglam.png",
          url: "http://backham.me/"
        },
        {
          id: 4,
          category: "candy",
          color: "silhouette duo",
          image: "lens04_silhouetteduo.png",
          url: "http://backham.me/"
        },
        {
          id: 5,
          category: "yummy",
          color: "antique beige",
          image: "lens05_01_antiquebeige.png",
          url: "http://backham.me/"
        },
        {
          id: 6,
          category: "yummy",
          color: "chiffon brown",
          image: "lens05_02_chiffonbrown.png",
          url: "http://backham.me/"
        },
        {
          id: 7,
          category: "yummy",
          color: "urban noir",
          image: "lens05_03_urbannoir.png",
          url: "http://backham.me/"
        }
      ],
      categories: [
        {
          id: 1,
          category: "candy",
          image: "tough2_bt.png"
        },
        {
          id: 2,
          category: "yummy",
          image: "yummy_n2_bt.png"
        }
      ]
    };
  },
  components: {
    Header,
    Vid,
    Shoot,
    Overlay,
    Eyes,
    ProductList,
    ToggleButton,
    CategoryList
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
      this.$refs.overlay.shoot();
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
