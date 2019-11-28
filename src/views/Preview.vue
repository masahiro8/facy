<template>
  <div>
    <h1>Preview</h1>
    <div><NextButton /></div>
    <div><ShootButton /></div>
    <div><LensItem /></div>
  </div>
</template>

<script>
import NextButton from "../components/button/NextButton.vue";
import ShootButton from "../components/button/ShootButton.vue";
import LensItem from "../components/lens/LensItem.vue";

export default {
  components: {
    NextButton,
    ShootButton,
    LensItem
  }
};
</script>
