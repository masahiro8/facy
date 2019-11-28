<template>
  <div class="about">
    <Header />
    <div class="content">
      <div class="eyes-position">
        <EyesPosition />
      </div>
      <p>目の位置を<br />合わせてください</p>
    </div>
    <div class="button-area">
      <NextButton />
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
  }
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";
.about {
  height: 100vh;
  background-color: $color-bg;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 138px);
}

.eyes-position {
  display: flex;
  justify-content: center;
  padding-bottom: 46px;
}

.button-area {
  padding-bottom: 50px;
  width: 100%;
}
</style>
