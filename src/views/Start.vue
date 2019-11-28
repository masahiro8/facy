<template>
  <div class="start">
    <Header />
    <div class="content">
      <div class="eyes-position">
        <EyesPosition />
      </div>
      <p>目の位置を<br />合わせてください</p>
      <div class="button-area">
        <NextButton @goNext="goNext" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/header/Header.vue";
import EyesPosition from "../components/EyesPosition.vue";
import NextButton from "../components/button/NextButton.vue";
export default {
  components: {
    Header,
    EyesPosition,
    NextButton
  },
  methods: {
    goNext() {
      this.$router.push("/photo-shoot");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.start {
  height: 100vh;
  background-color: $color-bg;
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 38px);
}

.eyes-position {
  display: flex;
  justify-content: center;
  padding-bottom: 46px;
}

.button-area {
  position: absolute;
  bottom: 0;
  z-index: 10;
  padding-bottom: 50px;
  width: 100%;
}
</style>
