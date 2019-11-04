import * as _ from 'lodash';
import { getUrlParam } from './util/getUrlParam';

const param = getUrlParam();
export const isPreview = _.has(param, 'preview');

export const WINDOW_WIDTH = isPreview ? 375 : window.innerWidth;
export const WINDOW_HEIGHT = isPreview ? 812 : window.innerHeight;

export const VIDEO_WIDTH = 640; //1280 , 1280
export const VIDEO_HEIGHT = 480; //720  ,  960

export let CANVAS_WIDTH = 1280;
export let CANVAS_HEIGHT = 960;

export const PIXELRATIO = window.devicePixelRatio;

//画像の比率
//基準の画像サイズ  750pxをベースにして調整
//モバイルでは縮小する必要がある
//cloudinaryで750pxに縮尺して返してる
export const ASSRET_IMAGE_WIDTH = 750; //750
// export const ASSRET_IMAGE_SHIFT = 200 * (ASSRET_IMAGE_WIDTH / 750);
// export const ASSRET_IMAGE_SHIFT = 250 * (ASSRET_IMAGE_WIDTH / 750);
export const ASSRET_IMAGE_SHIFT = 140 * (ASSRET_IMAGE_WIDTH / 750);

//モバイルは大きく表示されるので調整する
export const MOBILE_SCALE_RATE = 0.85;
// export const MOBILE_SCALE_RATE = 0.65;

//検出感覚
// export const detectInterval = 150;
export const detectInterval = 1000;
