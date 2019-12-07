<template>
  <div class="product" :class="selectSelf ? 'selected' : ''" @click="selectedProduct()">
    <transition name="rotate-fade">
      <CheckCircle v-if="selectSelf" class="icon" :size="24" />
    </transition>
    <div class="product-image">
      <img :src="getImagePath(item)" />
    </div>
    <p class="description">{{ item.name }}</p>
    <transition name="slide-fade">
      <a class="shop-link" :href="item.url" target="_blank" v-if="selectSelf">Buy now !</a>
    </transition>
  </div>
</template>
<script>
import CheckCircle from "vue-material-design-icons/CheckCircle.vue";
export default {
  data: () => {
    return {
      selectSelf: false
    };
  },
  props: {
    item: {
      type: Object
    },
    selected: Number
  },
  components: {
    CheckCircle
  },
  methods: {
    getImagePath: item => {
      return `${window.location.origin}/images/${item.category}/${item.image}`;
    },
    selectedProduct() {
      this.selectSelf = !this.selectSelf;
      this.$emit("setProductId", this.selectSelf ? this.item.id : null);
    }
  },
  watch: {
    selected: {
      immediate: true,
      handler(newValue) {
        this.selectSelf = newValue === this.item.id;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.product {
  position: relative;
  // overflow: hidden;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  width: 94px;
  // height: 110px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  transition: all 0.4s ease;
  &.selected {
    transform: scale(1.1);
  }
}

.icon {
  position: absolute;
  top: 0;
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 100px;
  transform: translateY(-55%);
  line-height: $label;
  color: $color-base-20;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  & svg.material-design-icon__svg {
    transform: scale(1.2);
  }
}

.rotate-fade-enter-active,
.rotate-fade-leave-active {
  transition: all 0.3s ease;
}
.rotate-fade-enter, .rotate-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: rotate(180deg);
  opacity: 0;
}

.product-image {
  margin: $padding-10;
  width: 54px;
  height: 54px;
  img {
    width: 100%;
    height: auto;
  }
}

.description {
  padding: 0 $padding-10 $padding-10;
  font-size: $font-20;
  letter-spacing: 4px;
}

.shop-link {
  display: block;
  padding: $padding-20 $padding-10;
  width: 100%;
  background-color: $color-base-50;
  border-radius: 0 0 8px 8px;
  font-size: $font-20;
  letter-spacing: 1.5px;
  text-decoration: none;
  color: $color-base-10;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
