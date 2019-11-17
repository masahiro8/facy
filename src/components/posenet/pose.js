/* eslint-disable */
import * as _ from "lodash";
import { drawPointByPosition } from "../../util/canvasUtil";
import { Effects } from "../effects/Effects";

const PosenetSetting = {
  flipHorizontal: true, //画像はウェブカメラから供給されているため
  imageScaleFactor: 0.5, //画像を一定の倍率に縮小する。 画像が大きすぎると遅くなります
  outputStride: 8, // GPU依存 畳み込み 16:速い 8:遅い
  maxPoseDetections: 1,
  minPoseConfidence: 0.4,
  minPartConfidence: 0.8,
  nmsRadius: 10.0
};

const types = {
  LEFT_EYE: "leftEye",
  RIGHT_EYE: "rightEye",
  NOSE: "nose"
};

const _pose = () => {
  let net;
  let pose_data;
  let callbacks = [];

  const didLoadedModel = func => {
    callbacks.push(func);
  };

  const init = () => {
    return new Promise(async resolved => {
      net = await window.posenet.load();
      //ロード完了をコールバック
      _.map(callbacks, callback => {
        callback();
      });
      resolved();
    });
  };

  const predict = image => {
    pose_data = null;
    return new Promise(async resolved => {
      pose_data = await net.estimateSinglePose(image, {
        flipHorizontal: true
      });
      resolved();
    });
  };

  const getEyesPoints = overlay => {
    return new Promise(resolved => {
      const rect = overlay.getBoundingClientRect();
      //検出結果
      let eyes = {};
      _.map(pose_data.keypoints, item => {
        if (
          item.part === types.LEFT_EYE ||
          item.part === types.RIGHT_EYE ||
          item.part === types.NOSE
        ) {
          //TODO 左右反転
          const _x = (item.position.x - rect.width / 2) * -1 + rect.width / 2;
          eyes[item.part] = { x: _x, y: item.position.y };
        }
      });

      //目尻から目の中心までの距離
      const width_half = (eyes[types.LEFT_EYE].x - eyes[types.RIGHT_EYE].x) / 3;

      const getRect = (position, whalf) => {
        return {
          x: position.x - whalf,
          y: position.y - whalf / 2,
          width: whalf * 2,
          height: whalf
        };
      };

      const rects = {
        left: getRect(eyes[types.LEFT_EYE], width_half),
        right: getRect(eyes[types.RIGHT_EYE], width_half)
      };
      console.log("LEFT", width_half, rects.left, eyes[types.LEFT_EYE]);

      //ここから画像処理
      const ctx = overlay.getContext("2d");
      const effects = Effects(ctx, rects.left, rects.right); //両目の頂点情報
      const points = effects.getPoints();
      console.log("rects", rects, points);

      drawPointByPosition(overlay, eyes[types.LEFT_EYE], "#FF0000");
      drawPointByPosition(overlay, eyes[types.RIGHT_EYE], "#FF0000");
      drawPointByPosition(overlay, eyes[types.NOSE], "#FF0000");

      //目の中心
      resolved(points);
    });
  };

  return {
    init,
    didLoadedModel,
    predict,
    getEyesPoints
  };
};

export const pose = _pose();
