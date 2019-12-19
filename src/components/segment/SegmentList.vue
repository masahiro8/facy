<template>
  <ul class="segment-list">
    <li class="list-item" v-for="(item,index) in PRODUCT_TYPE" :key="index">
      <Segment :title="item" :id="item" @clickHandler="setSegment" />
    </li>
  </ul>
</template>
<script>
import { PRODUCT_TYPE } from "../../constants";
import { ContextStore } from "../../context/Store";
import Segment from "./Segment";

export default {
  data: () => {
    return {
      PRODUCT_TYPE
    };
  },
  components: {
    Segment
  },
  methods: {
    setSegment(id) {
      // console.log("setSegment", id);
      ContextStore.setContext("SEGMENT", { id });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.segment-list {
  overflow: scroll;
  padding: $padding-5 $padding-10;
  list-style-type: none;
  display: flex;
  background-color: white;
}

.list-item {
  margin-right: $padding-15;
}
</style>
