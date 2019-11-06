import * as _ from 'lodash';

//rgbの平均値
const getColorAverage = (data, index) => {
  return (data[index] + data[index + 1] + data[index + 2]) / 3;
};

//dataに色を設定
const setPixelColor = (data, index, rgba) => {
  data[index] = rgba.r;
  data[index + 1] = rgba.g;
  data[index + 2] = rgba.b;
  data[index + 3] = rgba.a;
};

//2値化
const Color2Value = (ctx, rect) => {
  const THRESHOLD = 40; //閾値
  let src = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
  let dst = ctx.createImageData(rect.width, rect.height);
  for (let i = 0; i < src.data.length; i += 4) {
    // let y =
    //   0.2126 * src.data[i] +
    //   0.7152 * src.data[i + 1] +
    //   0.0722 * src.data[i + 2];
    // let y = 0.299 * src.data[i] + 0.587 * src.data[i + 1] + 0.114 * src.data[i + 2]
    let y = (src.data[i] + src.data[i + 1] + src.data[i + 2]) / 3;
    y = parseInt(y, 10);
    if (y > THRESHOLD) {
      y = 255;
    } else {
      y = 0;
    }
    dst.data[i] = y;
    dst.data[i + 1] = y;
    dst.data[i + 2] = y;
    dst.data[i + 3] = src.data[i + 3];
  }
  return dst;
};

//中央値
const Median = (ctx, rect) => {
  let src = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
  let dst = ctx.createImageData(rect.width, rect.height);

  const getMedian = (color, i) => {
    //3x3のピクセル情報
    const colors = get3x3Pixel(src.data, rect.width, color, i);
    colors.sort((a, b) => a - b); //降順
    const _median = colors[Math.floor(colors.length / 2)]; //中央値
    return _median;
  };

  // 2行目〜n-1行目
  for (let n = rect.width * 4; n < src.data.length - rect.width * 4; n += 4) {
    if (n % (rect.width * 4) === 0) {
      console.log('empty');
    } else {
      dst.data[n] = getMedian(0, n);
      dst.data[n + 1] = getMedian(1, n);
      dst.data[n + 2] = getMedian(2, n);
      dst.data[n + 3] = src.data[n + 3];
    }
  }

  return dst;
};

//フラグ
const PIX_TYPE = {
  WHITE: -1,
  EYE: -2,
  OTHER: 1
};

//色
const PIX_COLOR = {
  WHITE: {
    r: 255,
    g: 255,
    b: 255,
    a: 255
  },
  EYE: {
    r: 0,
    g: 0,
    b: 0,
    a: 255
  },
  CLEAR: {
    r: 255,
    g: 255,
    b: 255,
    a: 255
  },
  RED: {
    r: 255,
    g: 0,
    b: 0,
    a: 255
  }
};

//横方向にn数以内の同じ色で終わる塊がある場合に透過
const Horizontal = (ctx, rect) => {
  const THRESHOLD = 10; //閾値
  let src = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
  let dst = ctx.createImageData(rect.width, rect.height);

  //右方向に色の違いを検索
  const getHorizontal = (data, index) => {
    //開始ピクセルが白の場合は検索しない
    const current_y = getColorAverage(data, index);
    if (current_y === 255) {
      return {
        rewrite: PIX_TYPE.WHITE,
        first: index,
        last: index
      };
    }
    const getPix = (i, depth, dir) => {
      //方向でindexを変える
      const direction = {
        top: i - rect.width * 4,
        bottom: i + rect.width * 4,
        left: i - 4,
        right: i + 4
      };
      let y = getColorAverage(data, i);
      //隣が黒の場合か最大数内の場合に隣へ
      const _i = direction[dir];
      const _depth = depth + 1;
      if (depth > THRESHOLD) {
        return {
          depth: depth,
          last: i
        };
      } else {
        if (y === 255) {
          return {
            depth: depth,
            last: i
          };
        }
        return getPix(_i, _depth, dir);
      }
    };
    // const y = getColorAverage(data, index + 1);
    const result_right = getPix(index, 0, 'right');
    const result_left = getPix(index, 0, 'left');
    const result_top = getPix(index, 0, 'top');
    const result_bottom = getPix(index, 0, 'bottom');

    // console.log(result_top.depth, result_bottom.depth);

    if (
      result_right.depth < THRESHOLD &&
      result_left.depth < THRESHOLD &&
      result_top.depth < THRESHOLD &&
      result_bottom.depth < THRESHOLD
    ) {
      return {
        rewrite: PIX_TYPE.OTHER,
        first: index,
        // last: result.last
        last: result_right
      };
    } else {
      //黒目かも
      return {
        rewrite: PIX_TYPE.EYE,
        first: index,
        // last: result.last
        last: result_right
      };
    }
  };

  // console.log('horizontal', rect.width, rect.height, src.data.length);
  for (let i = 0; i < src.data.length; i += 4) {
    const hor = getHorizontal(src.data, i);
    if (hor.rewrite === PIX_TYPE.WHITE) {
      //もともと白(検索する必要がない)
      setPixelColor(dst.data, i, PIX_COLOR.WHITE);
    } else if (hor.rewrite === PIX_TYPE.EYE) {
      //左隣が黒(黒目の可能性が高い)
      setPixelColor(dst.data, i, PIX_COLOR.EYE);
    } else {
      //削除
      setPixelColor(dst.data, i, PIX_COLOR.CLEAR);
    }
  }
  return dst;
};

//黒ピクセル開始から縦に閾値内で白に変わるものは非表示
const Vertical = (ctx, rect) => {
  const THRESHOLD = 5; //閾値=高さ
  let src = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
  let dst = ctx.createImageData(rect.width, rect.height);
  for (let i = 0; i < src.data.length; i++) {
    dst.data[i] = src.data[i];
  }

  //最初に検出した黒ピクセル
  const VarticalScan = (_data, _rect, index) => {
    const getPix = (i, depth) => {
      const _i = i + _rect.width * 4;
      const _y = getColorAverage(_data, _i);
      const _depth = depth + 1;

      if (depth > THRESHOLD) {
        return {
          result: false,
          depth
        };
      } else if (_y === 255) {
        return {
          result: true,
          depth
        };
      } else {
        return getPix(_i, _depth);
      }
    };
    //上から黒ピクセル検出までの数
    return getPix(index, 0);
  };

  //index~depthの範囲を白くする
  const setWhite = (data, _rect, index, depth) => {
    for (let i = 0; i <= depth; i++) {
      const _index = i * (_rect.width * 4) + index;
      data[_index] = 255;
      data[_index + 1] = 0;
      data[_index + 2] = 255;
      data[_index + 3] = 255;
    }
  };

  //左上から検索
  const ScanAll = (_data, _rect) => {
    const scan_y_range = 4; // 4/1の範囲
    for (let y = 0; y < Math.floor(_rect.height / scan_y_range); y++) {
      for (let x = 0; x < _rect.width; x++) {
        const index = Math.floor(y * (_rect.width * 4) + x * 4);
        const prev_index = Math.floor((y - 1) * (_rect.width * 4) + x * 4);
        const _y = getColorAverage(_data, index);
        const prev_y = getColorAverage(_data, prev_index);
        if (prev_y === 255 && _y === 0) {
          const scan = VarticalScan(_data, _rect, index);
          //塊だけ白くする
          if (scan.result && scan.depth > 1) {
            // console.log('setwhite', scan.result, scan.depth);
            setWhite(dst.data, _rect, index, scan.depth);
          }
        }
      }
    }
  };
  ScanAll(src.data, rect);
  return dst;
};

//範囲の中心点を抽出し、その中心の上下方向の境界を抽出し、それを半径とした円の外を削除する
const Center = (ctx, rect) => {
  const THRESHOLD = 1.2; //幅の拡張
  let src = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
  let dst = ctx.createImageData(rect.width, rect.height);

  const center = {
    x: Math.floor(rect.width / 2),
    y: Math.floor(rect.height / 2)
  };

  //境界を検出,最初に検出した黒ピクセル
  const ScanAll = data => {
    const getPix = (i, depth, from) => {
      //方向でindexを変える
      const direction = ii => {
        return {
          top: () => {
            return ii + rect.width * 4;
          },
          bottom: () => {
            return ii - rect.width * 4;
          }
        };
      };
      const _y = getColorAverage(data, i);
      const _i = direction(i)[from]();
      const _depth = depth + 1;

      if (_y === 0 || depth > Math.floor(rect.height / 2)) {
        return depth;
      } else {
        return getPix(_i, _depth, from);
      }
    };

    //上から黒ピクセル検出までの数
    const top_pix = center.x * 4;
    const top = getPix(top_pix, 0, 'top');

    //下から黒ピクセル検出までの数
    const bottom_pix = rect.height * (rect.width * 4) + center.x * 4;
    const bottom = getPix(bottom_pix, 0, 'bottom');

    return {
      top,
      bottom
    };
  };

  //rectを非表示
  const clearRect = (data, rect, square) => {
    for (let y = 0; y < rect.height; y++) {
      for (let x = 0; x < rect.width; x++) {
        const index = Math.floor(y * (rect.width * 4) + x * 4);
        if (
          x >= square.x &&
          x <= square.x + square.width &&
          y >= square.y &&
          y <= square.y + square.height
        ) {
          data[index] = src.data[index];
          data[index + 1] = src.data[index + 1];
          data[index + 2] = src.data[index + 2];
          data[index + 3] = src.data[index + 3];
        } else {
          data[index] = 255;
          data[index + 1] = 255;
          data[index + 2] = 255;
          data[index + 3] = 255;
        }
      }
    }
  };

  const { top, bottom } = ScanAll(src.data);
  const length = rect.height - top - bottom;
  // console.log('>', top, bottom, length);
  const clears = [
    {
      x: Math.floor(rect.width / 2) - Math.floor(rect.height / 2),
      y: top,
      width: rect.height * THRESHOLD,
      height: rect.height - bottom
    }
  ];
  clearRect(dst.data, rect, clears[0]);
  return dst;
};

//グレー
const Grayscale = (ctx, rect, n) => {
  let src = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
  let dst = ctx.createImageData(rect.width, rect.height);
  let colors = [];
  for (let i = 0; i < src.data.length; i += 4) {
    let y =
      (0.2126 * src.data[i] +
        0.7152 * src.data[i + 1] +
        0.0722 * src.data[i + 2]) /
      3;
    // let y = parseInt((src.data[i] + src.data[i + 1] + src.data[i + 2]) / 3);
    y = parseInt(y, n);
    let rate = y * (n / 255);
    y = 255 * rate.toFixed(1);
    dst.data[i] = y;
    dst.data[i + 1] = y;
    dst.data[i + 2] = y;
    dst.data[i + 3] = src.data[i + 3];
    colors.push(y);
  }

  //colorsの最大と最小
  console.log('colors = ', _.max(colors), _.min(colors));

  return dst;
};

//枠内の全体の明るさを平均化
const Brightness = (ctx, rect) => {
  let src = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
  let bright = 0;
  for (let i = 0; i < src.data.length; i += 4) {
    let y = (src.data[i] + src.data[i + 1] + src.data[i + 2]) / 3;
    bright += y;
  }
  const brightness = bright / src.data.length / 4;
  return brightness;
};

const Bezer = (ctx, rect) => {
  // let src = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
  // let dst = ctx.createImageData(rect.width, rect.height);
  const p = [{ x: 0, y: 0 }, { x: 50, y: 50 }, { x: 100, y: 0 }];
  const _x = n => {
    return (
      (p[2].x - 2 * p[1].x + p[0].x) * (n * n) +
      2 * (p[1].x - p[0].x) * n +
      p[0].x
    );
  };
  const _y = n => {
    return (
      (p[2].y - 2 * p[1].x + p[0].y) * (n * n) +
      2 * (p[1].y - p[0].y) * n +
      p[0].y
    );
  };

  let array = [];
  for (let i = 0; i < 100; i++) {
    array[i] = {
      x: _x(i),
      y: _y(i)
    };
  }
  // console.log(array);
};

/**
 * 三次元空間の距離
 */
const getColorDistance = (rgb1, rgb2) => {
  return Math.sqrt(
    Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
  );
};

/*
 * 同じ色の3x3のピクセルを取得
 */
const get3x3Pixel = (_data, width, color, index) => {
  const prevLine = index - width * 4;
  const nextLine = index + width * 4;
  return [
    _data[prevLine - 4 + color],
    _data[prevLine + color],
    _data[prevLine + 4 + color],
    _data[index - 4 + color],
    _data[index + color],
    _data[index + 4 + color],
    _data[nextLine - 4 + color],
    _data[nextLine + color],
    _data[nextLine + 4 + color]
  ];
};

/**
 *Canvasを空にする
 * @param {DOM} elm
 */
const clearCanvas = elm => {
  const canvas = document.querySelector(elm);
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, rect.width, rect.height);
};

const Lined = (ctx, rect) => {
  let src = ctx.getImageData(rect.x, rect.y, rect.width, rect.height);
  let dst = ctx.createImageData(rect.width, rect.height);

  let points = [];

  //設定
  let config = {};
  config.outlineColor = { r: 0, g: 255, b: 128 }; //色
  config.colorDistance = 1; //エッジ検出量
  config.hideline = 30; //排除する上下の行数
  config.showPoints = true; //頂点を描画

  for (let y = 0; y < rect.height; y++) {
    for (let x = 0; x < rect.width; x++) {
      const index = Math.floor(y * (rect.width * 4) + x * 4);
      const nextIndex = Math.floor(y * (rect.width * 4) + (x + 1) * 4);
      const underIndex = Math.floor((y + 1) * (rect.width * 4) + x * 4);
      // チェックするピクセルの色
      const current = {
        r: src.data[index],
        g: src.data[index + 1],
        b: src.data[index + 2]
      };
      // 右隣の色
      const next = {
        r: src.data[nextIndex],
        g: src.data[nextIndex + 1],
        b: src.data[nextIndex + 2]
      };
      // 下の色
      const under = {
        r: src.data[underIndex],
        g: src.data[underIndex + 1],
        b: src.data[underIndex + 2]
      };
      // console.log('draw', current);

      dst.data[index] = src.data[index];
      dst.data[index + 1] = src.data[index + 1];
      dst.data[index + 2] = src.data[index + 2];
      dst.data[index + 3] = src.data[index + 3];

      //上下左右は対象外
      if (x >= rect.width - 2 || y >= rect.height - 2 || x <= 1 || y <= 1) {
        dst.data[index] = 255;
        dst.data[index + 1] = 255;
        dst.data[index + 2] = 255;
        dst.data[index + 3] = 255;
      } else {
        // 現在のピクセルと右隣、下の色の三次元空間上の距離を閾値と比較する
        if (
          getColorDistance(current, next) > config.colorDistance ||
          getColorDistance(current, under) > config.colorDistance
        ) {
          if (config.showPoints) {
            dst.data[index] = config.outlineColor.r;
            dst.data[index + 1] = config.outlineColor.g;
            dst.data[index + 2] = config.outlineColor.b;
            points.push({ x: x + 1, y: y + 1 });
          }
        }
      }
    }
  }

  const getContext = () => {
    return dst;
  };

  const getPoints = () => {
    return points;
  };

  return {
    getContext,
    getPoints
  };
};

export {
  getColorAverage,
  setPixelColor,
  Color2Value,
  Median,
  Horizontal,
  Vertical,
  Center,
  Grayscale,
  Brightness,
  Bezer,
  getColorDistance,
  get3x3Pixel,
  clearCanvas,
  Lined
};
