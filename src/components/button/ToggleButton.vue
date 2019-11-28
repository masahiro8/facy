<template>
  <button
    class="toggle-button"
    :class="{ open: isOpen }"
    @click="$emit('toggle')"
  >
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABECAMAAADtEXj5AAAAPFBMVEUAAAA4i585jZ85jZ85jZ85jZ9Aip85jZ84jZ84i5s5jZ84i585jJ85jZ84jZ05jZ85jJ85i585jp45jZ8MKH/vAAAAE3RSTlMAIN+ggO8Qv2BAj0DPr2BwUHBvAS/zpQAAANZJREFUWMPtksESwiAMRIUCQmltNf//r6a9ZKyVJTrjKe9GgbDbeRfDMAzDMP5GHpz6TpnSy/pKFHQT3Hy84gYif+ufkEKkGN7meqLZ9dbgw6ftM2+MrqcGN5+qrPWFUiCK98YLE09pR8mR06b2EWl6RuEa19oT1S8f9kaukcEA+S3lZOPRqAELSQ2ncD3QQaG0hVvbrgNxdy2T2vVVChUvNZSuL/wppF1LX79wXdKN8qLWdUlHQ/rR9TxXcx24DsGuY7DrGOw6BruOwa5jgOs6xHXDMDaeUQYOqX4hpyEAAAAASUVORK5CYII="
    />
  </button>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/config.scss";

.toggle-button {
  padding: $padding-5;
  width: 40px;
  height: 40px;
  outline: none;
  line-height: $label;
  text-align: center;
  color: $color-base-10;
  transform: rotate(-180deg);
  transition: all 0.4s ease;
  img {
    width: 100%;
    height: auto;
  }
  &.open {
    transform: rotate(0deg);
  }
}
</style>
