<template>
  <div ref="overlayFrame" class="overlayFrame">
    <canvas
      ref="canvas_left"
      class="overlay"
      :style="getStyle"
      :width="frame_rect.width"
      :height="frame_rect.height"
    />
    <canvas
      ref="canvas_right"
      class="overlay"
      :style="getStyle"
      :width="frame_rect.width"
      :height="frame_rect.height"
    />
  </div>
</template>
<script>
import * as _ from "lodash";
import { PRODUCT_TYPE } from "../../constants";
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../config";
import { verticalBisecter, distance, theta } from "../../util/vector";
import { houghTransform } from "../../util/houghTransform";

export default {
  data: () => {
    return {
      frame_rect: {
        width: 0,
        height: 0
      },
      product: null,
      productType: PRODUCT_TYPE.LENS,
      lens_image: "",
      canvas_rect: {}
    };
  },

  mounted() {
    this.frame_rect = this.$refs.overlayFrame.getBoundingClientRect();
    this.layoutUpdate();
    this.$nextTick(() => {
      this.clearCanvas();
    });
  },

  props: {
    rect: {
      type: Object,
      default: null
    },
    points: Object,
    productId: Object,
    products: Object,
    zIndex: {
      type: Number,
      default: 3
    }
  },

  methods: {
    draw({ left, right }, image) {
      const drawMask = (canvas, points) => {
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
          if (i == 0) {
            ctx.moveTo(points[i][0], points[i][1]);
          } else {
            ctx.lineTo(points[i][0], points[i][1]);
          }
        }
        ctx.closePath();
        ctx.fill();
      };

      const _drawMaskPoint = (canvas, _points) => {
        let points = [];

        for (let i = 0; i < _points.length; i++) {
          //偶数のみ
          if (i % 2 === 0) {
            points.push(_points[i]);
          }
        }

        //垂直二等分線
        let verticalLines = [];
        for (let i = 0; i < points.length; i++) {
          //偶数のみ
          const n = i + 1 >= points.length ? 0 : i + 1;
          const p1 = { x: points[i][0], y: points[i][1] };
          const p2 = { x: points[n][0], y: points[n][1] };
          const verticalLine = verticalBisecter(p1, p2);
          verticalLines.push(verticalLine);
        }

        //交点
        let circlePoints = [];
        for (let i = 0; i < verticalLines.length; i++) {
          const n = i + 1 === verticalLines.length ? 0 : i + 1;
          const l1 = verticalLines[i];
          const l2 = verticalLines[n];
          const z =
            Math.round((1 / (Math.floor(-1 * l1.rot.x) + l2.rot.x)) * 1000) /
            1000; // z = 1/(-a+c)
          console.log("垂直線", l1.rot, l2.rot, z);

          //交点
          const y1 = -l2.rot.x * (-1 * l1.rot.y);
          const y2 = l1.rot.x * (-1 * l2.rot.y);
          const center = {
            x: z * (-1 * -l1.rot.y + 1 * -l2.rot.y), // x = z * (-1 * -b + 1 * -d)
            y: z * (y1 + y2) // y = z * (-c * -b + a * -d)
          };
          //半径
          const radius = distance(center, l1.center);
          circlePoints.push({ center, radius, point: l1.center });
          console.log("円の半径と中心点", radius, center);
        }

        //角度
        let newPoints = [];
        for (let i = 0; i < points.length; i++) {
          const n = i + 1 === points.length ? 0 : i + 1;
          //角度差
          const center = circlePoints[i].center;
          const next = circlePoints[i].point;
          const radius = circlePoints[i].radius;
          const p1 = { x: points[i][0] - center.x, y: points[i][1] - center.y };
          const p2 = { x: next.x - center.x, y: next.y - center.y };
          console.log("p1,p2= ", p1, p2);
          //p1のラジアン
          const p1_radian = theta({ x: radius, y: 0 }, p1);
          const diff_radian = theta(p1, p2);
          if (p1_radian && diff_radian) {
            //試しにp1を復元する
            const _p1 = {
              x: Math.cos(p1_radian) * radius + center.x,
              y: Math.sin(p1_radian) * radius + center.y
            };
            newPoints.push(_p1);
            console.log("R= ", _p1, points[i]);
            // console.log("R= ", diff_radian, p1_radian, p1, p);
          }
        }

        const ctx = canvas.getContext("2d");
        ctx.save();
        ctx.fillStyle = "rgb(0,255,0)";
        // ctx.globalCompositeOperation = "source-in";
        for (let i = 0; i < points.length; i++) {
          ctx.fillRect(points[i][0] - 1, points[i][1] - 1, 1, 1);
        }
        for (let i = 0; i < newPoints.length; i++) {
          ctx.fillRect(newPoints[i].x - 2, newPoints[i].y - 2, 4, 4);
        }
        ctx.fill();
      };

      const drawMaskCurve = (canvas, _points) => {
        const points = _(_points)
          .map(point => {
            return {
              x: point[0],
              y: point[1]
            };
          })
          .filter((point, index) => {
            return index % 2 === 0;
          })
          .value();

        //交点
        const getMiddlePoint = ({ p1, p2, p3, p4 }) => {
          const s1 =
            ((p4.x - p2.x) * (p1.y - p2.y) - (p4.y - p2.y) * (p1.x - p2.x)) *
            0.5;
          const s2 =
            ((p4.x - p2.x) * (p2.y - p3.y) - (p4.y - p2.y) * (p2.x - p3.x)) *
            0.5;
          return {
            x: p1.x + (p3.x - p1.x) * (s1 / (s1 + s2)),
            y: p1.y + (p3.y - p1.y) * (s1 / (s1 + s2))
          };
        };

        const _uppoint = getMiddlePoint({
          p1: points[0],
          p2: points[2],
          p3: points[1],
          p4: points[3]
        });

        //uppointは補正
        const uppoint = {
          x: _uppoint.x,
          y: _uppoint.y - (_uppoint.y - points[2].y) * 0.8
        };

        const downpoint = getMiddlePoint({
          p1: points[3],
          p2: points[5],
          p3: points[4],
          p4: points[0]
        });

        //上瞼の中心と左右を曲線で結ぶ
        const upMiddlePoint = {
          x: (points[1].x + points[2].x) / 2,
          y: (points[1].y + points[2].y) / 2
        };
        const rightCenterPoint = {
          x: (points[0].x + upMiddlePoint.x) / 2.1,
          y: (points[0].y + upMiddlePoint.y) / 2.04
        };
        const leftCenterPoint = {
          x: (upMiddlePoint.x + points[3].x) / 1.9,
          y: (upMiddlePoint.y + points[3].y) / 2.04
        };
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(0,0,0)";
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.quadraticCurveTo(
          rightCenterPoint.x,
          rightCenterPoint.y,
          upMiddlePoint.x,
          upMiddlePoint.y
        );
        ctx.quadraticCurveTo(
          leftCenterPoint.x,
          leftCenterPoint.y,
          points[3].x,
          points[3].y
        );
        ctx.lineTo(points[4].x, points[4].y);
        ctx.quadraticCurveTo(
          downpoint.x,
          downpoint.y,
          points[5].x,
          points[5].y
        );
        ctx.lineTo(points[0].x, points[0].y);
        ctx.closePath();
        ctx.fill();

        //上瞼中央を曲線
        // const ctx = canvas.getContext("2d");
        // ctx.fillStyle = "rgb(0,0,0)";
        // ctx.save();
        // ctx.globalCompositeOperation = "source-over";
        // ctx.beginPath();
        // ctx.moveTo(points[0].x, points[0].y);
        // ctx.lineTo(points[1].x, points[1].y);
        // ctx.quadraticCurveTo(uppoint.x, uppoint.y, points[2].x, points[2].y);
        // ctx.lineTo(points[3].x, points[3].y);
        // ctx.moveTo(points[3].x, points[3].y);
        // ctx.lineTo(points[4].x, points[4].y);
        // ctx.quadraticCurveTo(
        //   downpoint.x,
        //   downpoint.y,
        //   points[5].x,
        //   points[5].y
        // );
        // ctx.lineTo(points[0].x, points[0].y);
        // ctx.closePath();
        // ctx.fill();

        //線を描画
        // const ctx = canvas.getContext("2d");
        // ctx.fillStyle = "rgb(0,0,0)";
        // ctx.save();
        // ctx.lineWidth = 2;
        // ctx.strokeStyle = "rgb(0,0,0)";
        // ctx.beginPath();
        // ctx.moveTo(_points[0][0], _points[0][1]);
        // for (let i = 1; i < _points.length; i++) {
        //   if (i % 2 === 0) {
        //     ctx.lineTo(_points[i][0], _points[i][1]);
        //     console.log("points", _points[i]);
        //   }
        // }
        // ctx.closePath();
        // ctx.stroke();

        //頂点３つづつ取り出す
        // const max = points.length - 1;
        // for (let i = 0; i <= max; i++) {
        //   const n1 = i;
        //   const n2 = max == i ? 0 : i + 1;
        //   const n3 = max - 1 <= i ? max - i + 1 : i + 2;
        //   const points_3 = [points[n1], points[n2], points[n3]];
        //   console.log("-- points_3 --", houghTransform(points_3));
        // }
        // //
        // const result = houghTransform(points);
        // console.log("--", result);
      };

      const drawCenter = (canvas, arr) => {
        const center = {
          x: arr[0],
          y: arr[1]
        };
        var circle = new Path2D();
        circle.moveTo(arr[0], arr[1]);
        circle.arc(arr[0], arr[1], arr[2], 0, 2 * Math.PI);
        const ctx = canvas.getContext("2d");
        ctx.globalCompositeOperation = "source-in";
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.beginPath();
        ctx.fill(circle);
        ctx.restore();
      };

      const drawImage = (canvas, arr, path) => {
        const rect = {
          x: arr[0] - arr[2],
          y: arr[1] - arr[2],
          width: arr[2] * 2,
          height: arr[2] * 2
        };
        const lens = new Image();
        lens.onload = () => {
          const ctx = canvas.getContext("2d");
          ctx.globalCompositeOperation = "source-in";
          ctx.drawImage(lens, rect.x, rect.y, rect.width, rect.height);
          ctx.restore();
        };
        lens.src = path;
      };

      //黒目の半径は平均値を取得
      const _left = { ...left };
      const _right = { ...right };
      //半径が小さい方を選択
      const r =
        _left.pupil[2] < _right.pupil[2] ? _left.pupil[2] : _right.pupil[2];
      _left.pupil[2] = r;
      _right.pupil[2] = r;

      // drawMask(this.$refs.canvas_left, _left.eyelid);
      drawMaskCurve(this.$refs.canvas_left, _left.eyelid);
      // drawCenter(this.$refs.canvas_left, _left.pupil);
      if (image) {
        drawImage(this.$refs.canvas_left, _left.pupil, image);
      }

      // drawMask(this.$refs.canvas_right, _right.eyelid);
      drawMaskCurve(this.$refs.canvas_right, _right.eyelid);
      // drawCenter(this.$refs.canvas_right, _right.pupil);
      if (image) {
        drawImage(this.$refs.canvas_right, _right.pupil, image);
      }
    },
    //キャンバスクリア
    clearCanvas() {
      const clearCanvasRect = canvas => {
        const ctx = canvas.getContext("2d");
        ctx.restore();
        console.log("clear", this.frame_rect.width, this.frame_rect.height);
        ctx.clearRect(0, 0, this.frame_rect.width, this.frame_rect.height);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();
      };
      clearCanvasRect(this.$refs.canvas_left);
      clearCanvasRect(this.$refs.canvas_right);
    },
    layoutUpdate() {
      if (this.rect && this.frame_rect.width && this.frame_rect.height) {
        const frame = {
          left: (WINDOW_WIDTH - this.frame_rect.width) / 2
        };
        this.$refs.canvas_left.style.width = `${this.frame_rect.width}px`;
        this.$refs.canvas_left.style.height = `${this.frame_rect.height}px`;
        this.$refs.canvas_right.style.width = `${this.frame_rect.width}px`;
        this.$refs.canvas_right.style.height = `${this.frame_rect.height}px`;

        //画像
        const _width = this.rect.width - this.rect.x * 2;
        this.canvas_rect = {
          width: _width,
          height: this.rect.height
        };
      }
    }
  },

  watch: {
    productId: {
      immediate: true,
      handler(newValue, oldValue) {
        if (!newValue) {
          this.clearCanvas();
        }
        const product = _.find(
          this.products[this.productType].products,
          product => {
            return product.id === newValue.productId;
          }
        );
        if (product) {
          this.product = product;
          this.lens_image = `${window.location.origin}/images/${product.category}/${product.image}`;
          this.draw(this.points.eyes, this.lens_image);
        }
      }
    },
    rect: {
      immediate: true,
      handler() {
        this.layoutUpdate();
      }
    }
  },

  computed: {
    getStyle() {
      let style = "";
      style += `z-index:${this.z};`;
      return style;
    }
  }
};
</script>
<style lang="scss" scoped>
.overlayFrame {
  position: absolute;
  width: 375px;
  height: 100%;
  overflow: hidden;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  transform: scale(-1, 1);
  mix-blend-mode: soft-light;
  mix-blend-mode: luminosity;
}
</style>
