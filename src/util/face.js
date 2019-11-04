import * as faceapi from 'face-api.js';
// import * as FACE from './face.config';

const _face = overlay => {
  let isActive = false;

  const init = () => {
    return new Promise(async resolved => {
      await faceapi.loadTinyFaceDetectorModel(
        '/tiny_face_detector_model-weights_manifest.json'
      );
      await faceapi.loadFaceLandmarkTinyModel(
        '/face_landmark_68_tiny_model-weights_manifest.json'
      );
      isActive = true;
      console.log('face init');
      resolved();
    });
  };

  const getEyesPoints = () => {
    return new Promise(async resolved => {
      //faceapiの検出結果を取得
      const options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 128,
        scoreThreshold: 0.3
      });
      let result = await faceapi
        .detectSingleFace(overlay, options)
        .withFaceLandmarks(true);
      if (result) {
        console.log('result = ', [result]);
        // //検出したデータから描画
        // const {
        //   left_eye_rect,
        //   right_eye_rect,
        //   left_eye_points,
        //   right_eye_points,
        //   rate,
        //   shift
        // } = drawLandmarks(overlay, overlay, [result]);

        // //両目の頂点情報
        // const effects = Effects(
        //   overlay.getContext('2d'),
        //   flagCtl,
        //   left_eye_rect,
        //   right_eye_rect
        // );
        // const points = effects.getPoints();
        resolved();
      }
    });
  };

  return {
    init,
    getEyesPoints
  };
};

export const face = _face();
