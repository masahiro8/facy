import { hoc } from "./hoc";
import Overlay from "./TPLOverlay.vue";

export const Eyes = hoc(Overlay, () => {
  return {
    methods: {
      draw() {
        //TODO ここで目を描画
        console.log("canvas", this.$refs.canvas);
      }
    }
  };
});
