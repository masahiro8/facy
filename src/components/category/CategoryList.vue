<template>
  <ul class="category-list">
    <li class="list-item" v-for="item in itemList" :key="item.id">
      <Category :item="item" @clickHandler="setCategory" />
    </li>
  </ul>
</template>
<script>
import * as _ from "lodash";
import Category from "./Category.vue";
import { ContextStore } from "../../context/Store";
export default {
  data: () => {
    return {
      categories: []
    };
  },
  props: {
    segment: {
      type: Object
    },
    items: {
      type: Object
    }
  },
  components: {
    Category
  },
  methods: {
    setCategory(id) {
      ContextStore.setContext("CATEGORY", { id });
    }
  },
  watch: {
    segment: {
      immediate: true,
      handler(newValue) {
        console.log("segmentType -----", newValue);
      }
    },
    items: {
      immediate: true,
      handler(newValue) {
        console.log("items -----", newValue);
      }
    }
  },
  computed: {
    itemList() {
      if (this.items && this.segment && _.has(this.items, this.segment.id)) {
        return this.items[this.segment.id].category;
      }
      return [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/config.scss";

.category-list {
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
