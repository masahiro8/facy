/* eslint-disable */
import { getRect } from '../util/canvasUtil';
import { LEFT_EYE, RIGHT_EYE } from '../constants/face';
import { Effects } from '../components/effects/Effects';

const _face = () => {
  let isActive = false;
  let src = null;
  let overlay = null;
  let options = null;

  const init = (_src, _overlay) => {
    overlay = _overlay;
    src = _src;
    console.log('load models');
    return new Promise(async resolved => {
      await faceapi.loadTinyFaceDetectorModel(
        '/js/tiny_face_detector_model-weights_manifest.json'
      );
      await faceapi.loadFaceLandmarkTinyModel(
        '/js/face_landmark_68_tiny_model-weights_manifest.json'
      );
      options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 128,
        scoreThreshold: 0.3
      });
      isActive = true;
      console.log('loaded models');
      resolved();
    });
  };

  //videoからcanvasサイズを変換
  const resizeCanvasAndResults = (dimensions, canvas, results) => {
    const { width, height } =
      dimensions instanceof HTMLVideoElement
        ? faceapi.getMediaDimensions(dimensions)
        : dimensions;
    canvas.width = width;
    canvas.height = height;
    return results.map(res => res.forSize(width, height));
  };

  const drawLandmarks = (video, canvas, results) => {
    const resizedResults = resizeCanvasAndResults(video, canvas, results);
    const faceLandmarks = resizedResults.map(det => det.landmarks);
    //faceapiで線を描画しているので、faceLandmarksから目の座標を取り出して、自前でキャンバスに描画をする
    // const drawLandmarksOptions = { lineWidth: 2, drawLines: true, color: 'green' }
    // faceapi.drawLandmarks(canvas, faceLandmarks, drawLandmarksOptions);

    //ここから自前で描画
    const rect = canvas.getBoundingClientRect();

    //縮尺計算
    const rate = {
      x: faceLandmarks[0].imageWidth / rect.width,
      y: faceLandmarks[0].imageHeight / rect.height
    };

    const shift = faceLandmarks[0].shift;

    console.log('face', faceLandmarks[0].relativePositions, LEFT_EYE);

    //目のポイントから範囲の２点を取得
    const left_eye_points = getRect(
      faceLandmarks[0].relativePositions,
      LEFT_EYE
    ).get2Points();
    const right_eye_points = getRect(
      faceLandmarks[0].relativePositions,
      RIGHT_EYE
    ).get2Points();

    const left_eye_rect = {
      x: Math.floor(rect.width * left_eye_points.x * rate.x + shift.x),
      y: Math.floor(rect.height * left_eye_points.y * rate.y + shift.y),
      width: Math.floor(
        rect.width * left_eye_points.x2 * rate.x -
          rect.width * left_eye_points.x * rate.x
      ),
      height: Math.floor(
        rect.height * left_eye_points.y2 * rate.y -
          rect.height * left_eye_points.y * rate.y
      )
    };

    const right_eye_rect = {
      x: Math.floor(rect.width * right_eye_points.x * rate.x + shift.x),
      y: Math.floor(rect.height * right_eye_points.y * rate.y + shift.y),
      width: Math.floor(
        rect.width * right_eye_points.x2 * rate.x -
          rect.width * right_eye_points.x * rate.x
      ),
      height: Math.floor(
        rect.height * right_eye_points.y2 * rate.y -
          rect.height * right_eye_points.y * rate.y
      )
    };

    return {
      left_eye_rect,
      right_eye_rect,
      left_eye_points,
      right_eye_points,
      rate,
      shift
    };
  };

  const getEyesPoints = () => {
    return new Promise(async resolved => {
      //faceapiの検出結果を取得

      let result = await faceapi
        .detectSingleFace(overlay, options)
        .withFaceLandmarks(true);
      if (result) {
        console.log('result = ', [result]);
        // //検出したデータから描画
        const {
          left_eye_rect,
          right_eye_rect,
          left_eye_points,
          right_eye_points,
          rate,
          shift
        } = drawLandmarks(overlay, overlay, [result]);

        console.log('left_eye_rect = ', left_eye_rect);

        // //両目の頂点情報
        const effects = Effects(
          overlay.getContext('2d'),
          left_eye_rect,
          right_eye_rect
        );
        const points = effects.getPoints();
        console.log('points = ', points);
        resolved(points);
      }
    });
  };

  return {
    init,
    getEyesPoints
  };
};

export const face = _face();
