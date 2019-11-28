<template>
  <div class="select">
    <Header />
    <div class="content">
      <p>撮影した写真を表示</p>
      <div class="select-area">
        <ProductList :items="products" />
        <ToggleButton @toggle="show = !show" :isOpen="show" />
        <transition name="slide-fade">
          <CategoryList :items="categories" v-if="show" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/header/Header.vue";
import ProductList from "../components/products/ProductList.vue";
import ToggleButton from "../components/button/ToggleButton.vue";
import CategoryList from "../components/category/CategoryList.vue";
export default {
  components: {
    Header,
    ProductList,
    ToggleButton,
    CategoryList
  },
  data: () => {
    return {
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
  }
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.select {
  height: 100vh;
  background-color: $color-base-50;
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 38px);
}

.select-area {
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
