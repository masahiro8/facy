<template>
  <div>
    <slot :context="data"></slot>
  </div>
</template>
<script>
import * as _ from "lodash";
import { ContextStore } from "./Store";

export default {
  data: () => {
    return {
      data: {}
    };
  },
  props: {
    contextKey: {
      type: Array
    }
  },
  watch: {
    contextKey: {
      immediate: true,
      handler(newValue) {
        _.map(newValue, key => {
          this.data = { [key]: null };
        });
      }
    }
  },
  mounted() {
    ContextStore.getContext(value => {
      _.map(this.contextKey, key => {
        if (_.has(value, key)) {
          let _data = { ...this.data };
          _data[key] = { ...value[key] };
          this.data = _data;
        }
      });

      console.log("connect CONTENTS", this.data["CONTENTS"]);
    });
  }
};
</script>
<style lang="scss"></style>
