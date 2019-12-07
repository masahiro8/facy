<template>
  <button class="button" @click="action">
    <div class="icon">
      <Close :size="20" />
    </div>
  </button>
</template>

<script>
import Close from "vue-material-design-icons/Close.vue";

export default {
  components: {
    Close
  },
  data: () => {
    return {};
  },
  methods: {
    action() {
      this.$emit("action");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../style/config.scss";

.button {
  z-index: 99;
  position: absolute;
  width: 32px;
  height: 32px;
  top: 48px;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  font-size: $font-60;
  text-align: center;
  color: black;
}
</style>
