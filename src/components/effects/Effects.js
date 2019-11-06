import * as _ from 'lodash';
import {
  Grayscale,
  Color2Value,
  Center,
  Median,
  Horizontal,
  Lined,
  Vertical
} from '../../util/imageUtil';
import { EffectFlags, FLAG_KEYS } from '../effects/EffectFlags';
/**
 * エフェクトの適用
 */
export const Effects = (ctx, left_eye_rect, right_eye_rect) => {
  //明るさ
  // const left_bright = Brightness(ctx, left_eye_rect);
  // const right_bright = Brightness(ctx, right_eye_rect);
  // console.log(left_bright.toFixed(1), right_bright.toFixed(1));

  //グレー
  if (EffectFlags.getValue(FLAG_KEYS.GRAY.key)) {
    const gray_left = Grayscale(ctx, left_eye_rect, 10);
    const gray_right = Grayscale(ctx, right_eye_rect, 10);
    ctx.putImageData(gray_left, left_eye_rect.x, left_eye_rect.y);
    ctx.putImageData(gray_right, right_eye_rect.x, right_eye_rect.y);
  }

  //ここから２値化
  if (EffectFlags.getValue(FLAG_KEYS.BW.key)) {
    const col2_left = Color2Value(ctx, left_eye_rect);
    const col2_right = Color2Value(ctx, right_eye_rect);
    ctx.putImageData(col2_left, left_eye_rect.x, left_eye_rect.y);
    ctx.putImageData(col2_right, right_eye_rect.x, right_eye_rect.y);
  }

  //中央だけ残す
  if (EffectFlags.getValue(FLAG_KEYS.CENT.key)) {
    const center_left = Center(ctx, left_eye_rect);
    const center_right = Center(ctx, right_eye_rect);
    ctx.putImageData(center_left, left_eye_rect.x, left_eye_rect.y);
    ctx.putImageData(center_right, right_eye_rect.x, right_eye_rect.y);
  }

  //ここから中央値
  if (EffectFlags.getValue(FLAG_KEYS.MEDI.key)) {
    let md_left = Median(ctx, left_eye_rect);
    let md_right = Median(ctx, right_eye_rect);
    ctx.putImageData(md_left, left_eye_rect.x, left_eye_rect.y);
    ctx.putImageData(md_right, right_eye_rect.x, right_eye_rect.y);

    md_left = Median(ctx, left_eye_rect);
    md_right = Median(ctx, right_eye_rect);
    ctx.putImageData(md_left, left_eye_rect.x, left_eye_rect.y);
    ctx.putImageData(md_right, right_eye_rect.x, right_eye_rect.y);
  }

  //まぶた周辺を消す
  if (EffectFlags.getValue(FLAG_KEYS.VERT.key)) {
    const vertical_left = Vertical(ctx, left_eye_rect);
    const vertical_right = Vertical(ctx, right_eye_rect);
    ctx.putImageData(vertical_left, left_eye_rect.x, left_eye_rect.y);
    ctx.putImageData(vertical_right, right_eye_rect.x, right_eye_rect.y);
  }

  //塊排除
  if (EffectFlags.getValue(FLAG_KEYS.HORI.key)) {
    const clear_left = Horizontal(ctx, left_eye_rect);
    const clear_right = Horizontal(ctx, right_eye_rect);
    ctx.putImageData(clear_left, left_eye_rect.x, left_eye_rect.y);
    ctx.putImageData(clear_right, right_eye_rect.x, right_eye_rect.y);
  }

  //頂点情報
  const getPoints = () => {
    const convertToGlobal = (points, rect) => {
      return _.map(points, point => {
        return {
          x: point.x + rect.x,
          y: point.y + rect.y
        };
      });
    };

    //線
    const line_left = Lined(ctx, left_eye_rect);
    const line_right = Lined(ctx, right_eye_rect);
    const left = line_left.getPoints();
    const right = line_right.getPoints();

    if (EffectFlags.getValue(FLAG_KEYS.LINE.key)) {
      const left_context = line_left.getContext();
      const right_context = line_right.getContext();
      ctx.putImageData(left_context, left_eye_rect.x, left_eye_rect.y);
      ctx.putImageData(right_context, right_eye_rect.x, right_eye_rect.y);
    }

    return {
      left: convertToGlobal(left, left_eye_rect),
      right: convertToGlobal(right, right_eye_rect)
    };
  };

  return {
    getPoints
  };
};
