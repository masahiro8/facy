<template>
  <canvas
    id="face"
    class="face"
    ref="face"
    :width="canvas_rect.width"
    :height="canvas_rect.height"
  ></canvas>
</template>

<script>
import * as _ from 'lodash';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from '../../config';
import { face } from '../../util/face';

export default {
  data: () => {
    return {
      loadedModel: false,
      showDetection: false,
      canvas_rect: {}
    };
  },
  mounted() {
    // console.log('face mounted');
  },
  props: {
    rect: Object,
    src: HTMLVideoElement
  },
  methods: {
    async faceDetect() {
      //ここで頂点を取得
      const points = await face.getFacePoints();
      console.log(points);
      //リサイズ
      const _width = this.rect.width - this.rect.x * 2;
      this.canvas_rect = {
        width: _width,
        height: this.rect.height
      };
      console.log('faceDetect');
      this.$emit('callbackPoints', points);
    }
  },
  watch: {
    src: {
      immediate: true,
      async handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.src = newValue;
          //faceAPiに取得用imageと描画用canvasを渡す
          await face.init(this.$refs.image, this.$refs.overlay);
          this.loadedModel = true;
        }
      }
    },
    rect: {
      immediate: true,
      handler(newValue, oldValue) {
        if (newValue !== oldValue && this.$refs.overlay) {
          const _width = newValue.width - newValue.x * 2;
          this.canvas_rect = {
            width: _width,
            height: newValue.height
          };
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
