<template>
  <ul class="segment-list">
    <li class="list-item" v-for="(item,index) in PRODUCT_TYPE" :key="index">
      <SegmentItem
        :selected="getSelected(item)"
        :title="getTitle(item)"
        :id="item"
        @clickHandler="setSegment"
      />
    </li>
  </ul>
</template>
<script>
import * as _ from "lodash";
import { PRODUCT_TYPE } from "../../constants";
import { ContextStore } from "../../context/Store";
import SegmentItem from "./Segment";

export default {
  data: () => {
    return {
      PRODUCT_TYPE
    };
  },
  props: {
    segment: {
      type: Object,
      default: () => {
        return {
          id: null
        };
      }
    },
    products: {
      type: Object
    }
  },
  components: {
    SegmentItem
  },
  watch: {
    segment: {
      immediate: true,
      handler(newValue) {
        console.log("segment", newValue);
      }
    },
    products: {
      immediate: true,
      handler(newValue) {
        console.log("products", newValue);
      }
    }
  },
  methods: {
    setSegment(id) {
      console.log("setSegment", id);
      ContextStore.setContext("SEGMENT", { id });
    },
    getTitle(id) {
      if (!_.has(this.products, id)) return null;
      return this.products[id].info.title;
    },
    getSelected(id) {
      if (!this.segment.id) return null;
      return this.segment.id === id;
    }
  },
  computed: {}
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
