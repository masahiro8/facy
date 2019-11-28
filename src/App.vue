<template>
  <div id="app">
    <div id="nav">
      <router-link to="/preview">Preview</router-link> |
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/photo-shoot">Shoot</router-link> |
      <router-link to="/select">Select</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  // methods: {
  //   //ここで両目の頂点情報を取得
  //   getPoints(points, face_eyes_data) {
  //     this.points = {
  //       eyes: points,
  //       face: face_eyes_data.points,
  //       shift: face_eyes_data.shift,
  //       rate: face_eyes_data.rate
  //     };
  //     console.log("points", points, face_eyes_data);
  //   }
  // }
};
</script>

<style lang="scss">
@import "./style/ress.scss";
@import "./style/config.scss";
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

#app {
  position: relative;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-base-10;
}

#nav {
  padding: 16px;
  background-color: $color-gray-50;

  a {
    font-weight: bold;
    color: $color-base-10;

    &.router-link-exact-active {
      color: $color-base-20;
    }
  }
}
</style>
