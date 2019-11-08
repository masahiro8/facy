import * as _ from 'lodash';
import { getUrlParam } from './util/getUrlParam';

export const isLocalhost = document.location.hostname == 'localhost';

const param = getUrlParam();
export const isPreview = _.has(param, 'preview');

export const WINDOW_WIDTH = isPreview ? 375 : window.innerWidth;
export const WINDOW_HEIGHT = isPreview ? 812 : window.innerHeight;

export const VIDEO_WIDTH = 640; //1280 , 1280
export const VIDEO_HEIGHT = 480; //720  ,  960

export const PIXELRATIO = window.devicePixelRatio;

//faceapi モデルのロード先
export const MODEL_LOAD_PATH = isLocalhost ? '' : '/eyetrack'; //gh-pages

//FaceAPI設定
export const FACEAPI_OPTION = {
  // size at which image is processed, the smaller the faster,
  // but less precise in detecting smaller faces, must be divisible
  // by 32, common sizes are 128, 160, 224, 320, 416, 512, 608,
  // for face tracking via webcam I would recommend using smaller sizes,
  // e.g. 128, 160, for detecting smaller faces use larger sizes, e.g. 512, 608
  // default: 416
  inputSize: 416, //128
  // minimum confidence threshold
  // default: 0.5
  scoreThreshold: 0.5 //0.3
};
