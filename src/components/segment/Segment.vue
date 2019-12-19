<template>
  <button @click="clickHandler(id)" class="segment">{{title}}</button>
</template>
<script>
export default {
  props: {
    id: {
      type: String
    },
    title: {
      type: String
    }
  },
  methods: {
    clickHandler(id) {
      this.$emit("clickHandler", id);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.segment {
  padding: $padding-5;
  width: 96px;
  height: 32px;
  background: white;
  border: 0;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);

  img {
    width: auto;
    height: 100%;
  }
}
</style>
