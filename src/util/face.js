/* eslint-disable */
import { getRect } from '../util/canvasUtil';
import { LEFT_EYE, RIGHT_EYE } from '../constants/face';
import { Effects } from '../components/effects/Effects';
import { FACEAPI_OPTION, MODEL_LOAD_PATH } from '../config';

const _face = () => {
  let src = null; //video
  let overlay = null; //canvas
  let options = null;
  let face_eyes_points = {};
  let shift = {};
  let rate = {};

  const init = (_src, _overlay) => {
    overlay = _overlay;
    src = _src;
    console.log('load models');
    //FaceAPiのモジュールを取得
    return new Promise(async resolved => {
      await faceapi.loadTinyFaceDetectorModel(
        `${MODEL_LOAD_PATH}/js/tiny_face_detector_model-weights_manifest.json`
      );
      await faceapi.loadFaceLandmarkTinyModel(
        `${MODEL_LOAD_PATH}/js/face_landmark_68_tiny_model-weights_manifest.json`
      );
      options = new faceapi.TinyFaceDetectorOptions(FACEAPI_OPTION);
      console.log('loaded models');
      resolved();
    });
  };

  //検出
  const DetectFaceAndLandmarkTiny = () => {
    return new Promise(async resolved => {
      //モデルの読み込み
      const dir = isGhPages ? '/eyetrack-dev' : '.';
      await faceapi.loadTinyFaceDetectorModel(
        `${dir}/tiny_face_detector_model-weights_manifest.json`
      );
      await faceapi.loadFaceLandmarkTinyModel(
        `${dir}/face_landmark_68_tiny_model-weights_manifest.json`
      );

      const options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 128,
        scoreThreshold: 0.5
      });
      let results = await faceapi
        .detectSingleFace(picture, options)
        .withFaceLandmarks(true);

      console.log('results', results);

      //videoからcanvasサイズを変換
      const resizeCanvasAndResults = (dimensions, canvas, results) => {
        const { width, height } =
          dimensions instanceof HTMLVideoElement
            ? faceapi.getMediaDimensions(dimensions)
            : dimensions;
        canvas.width = width;
        canvas.height = height;
        return faceapi.resizeResults(results, { width, height });
      };
      const resizedResults = resizeCanvasAndResults(video, overlay, [results]);
      const faceLandmarks = resizedResults.map(det => det.landmarks);
      const drawLandmarksOptions = {
        lineWidth: 2,
        drawLines: true,
        color: 'green'
      };
      faceapi.draw.drawFaceLandmarks(
        overlay,
        faceLandmarks,
        drawLandmarksOptions
      );
      console.log('resizedResults', resizedResults);

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
    return faceapi.resizeResults(results, { width, height });
    // return results.map(res => res.forSize(width, height));
  };

  const drawLandmarks = (video, canvas, results) => {
    const resizedResults = resizeCanvasAndResults(video, canvas, results);
    const faceLandmarks = resizedResults.map(det => det.landmarks);
    //faceapiで線を描画しているので、faceLandmarksから目の座標を取り出して、自前でキャンバスに描画をする
    const drawLandmarksOptions = {
      lineWidth: 2,
      drawLines: true,
      color: 'green'
    };
    faceapi.drawLandmarks(canvas, faceLandmarks, drawLandmarksOptions);

    //ここから自前で描画
    const rect = canvas.getBoundingClientRect();

    //縮尺計算
    rate = {
      x: faceLandmarks[0].imageWidth / rect.width,
      y: faceLandmarks[0].imageHeight / rect.height
    };

    shift = faceLandmarks[0].shift;

    console.log('ここまでOK?');
    console.log('face', faceLandmarks[0].relativePositions, shift);

    //目のポイントから範囲の２点を取得
    const left_eye_points = getRect(
      faceLandmarks[0].relativePositions,
      LEFT_EYE
    ).get2Points();
    const right_eye_points = getRect(
      faceLandmarks[0].relativePositions,
      RIGHT_EYE
    ).get2Points();

    //目の全頂点
    const left_face_eye_points = getRect(
      faceLandmarks[0].relativePositions,
      LEFT_EYE
    ).getPartsPoints();

    const right_face_eye_points = getRect(
      faceLandmarks[0].relativePositions,
      RIGHT_EYE
    ).getPartsPoints();

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
      left_face_eye_points,
      right_face_eye_points,
      rate,
      shift
    };
  };

  /**
   * FaceAPiの両目の頂点
   */
  const getFaceEyesData = () => {
    return { points: face_eyes_points, shift, rate };
  };

  const getEyesPoints = () => {
    return new Promise(async resolved => {
      //faceapiの検出結果を取得

      let result = await faceapi
        .detectSingleFace(image, options)
        .withFaceLandmarks(true);

      console.log('results', results);

      if (result) {
        // //検出したデータから描画
        const {
          left_eye_rect,
          right_eye_rect,
          left_eye_points,
          right_eye_points,
          left_face_eye_points,
          right_face_eye_points,
          rate,
          shift
        } = drawLandmarks(src, overlay, [result]);

        console.log('eyes', left_face_eye_points, right_face_eye_points);

        face_eyes_points = {
          left: left_face_eye_points,
          right: right_face_eye_points
        };

        //ここから画像処理
        const effects = Effects(
          overlay.getContext('2d'),
          left_eye_rect,
          right_eye_rect
        );
        //両目の頂点情報
        const points = effects.getPoints();
        resolved(points);
      }
    });
  };

  return {
    init,
    getFaceEyesData,
    getEyesPoints
  };
};

export const face = _face();
