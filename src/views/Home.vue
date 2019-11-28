<template>
  <div class="home">
    <div>
      <h1 class="title">f / b</h1>
      <p class="subtitle">facy / backham</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>

<style lang="scss" scoped>
@import "../style/config.scss";

.home {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 64px;
  font-weight: bold;
  line-height: $body;
}

.subtitle {
  font-size: $font-40;
  letter-spacing: 4px;
  line-height: $description;
}
</style>
