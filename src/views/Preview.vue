<template>
  <div>
    <h1>Preview</h1>
    <div><NextButton /></div>
    <div><ShootButton /></div>
    <div><ItemCard /></div>
  </div>
</template>

<script>
import NextButton from "../components/button/NextButton.vue";
import ShootButton from "../components/button/ShootButton.vue";
import ItemCard from "../components/products/ItemCard.vue";

export default {
  components: {
    NextButton,
    ShootButton,
    ItemCard
  }
};
</script>
