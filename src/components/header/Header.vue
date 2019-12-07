<template>
  <header class="global-header">
    <div>
      <slot name="left" />
    </div>
    <h1 class="logo">facy</h1>
    <div>
      <slot name="right" />
    </div>
  </header>
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: $font-40;
  font-weight: normal;
  letter-spacing: 8px;
  line-height: $label;
}
</style>
