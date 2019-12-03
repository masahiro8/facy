<template>
  <header class="global-header"><h1 class="logo">facy</h1></header>
</template>

<style lang="scss" scoped>
@import "@/style/config.scss";

.global-header {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  padding: $padding-15;
  width: 100%;
  background-color: white;
}

.logo {
  font-size: $font-40;
  font-weight: normal;
  letter-spacing: 8px;
  line-height: $label;
}
</style>
