import * as _ from 'lodash';

//ハフ変換
export const houghTransform = points => {
  //円の中心点の候補
  let center_points = [];

  //黒目の上端、下端、左端、右端
  const max_x = _.maxBy(points, function(point) {
    return point.x;
  }).x;
  const min_x = _.minBy(points, function(point) {
    return point.x;
  }).x;
  const max_y = _.maxBy(points, function(point) {
    return point.y;
  }).y;
  const min_y = _.minBy(points, function(point) {
    return point.y;
  }).y;
  //最大半径
  const max_r = (max_x - min_x) / 2;

  //黒目の輪郭線上の点を通る円の中心点
  for (let i = 0; i < points.length; i++) {
    //候補点(x,y)を順番に取り出して確認する
    let circle_x = points[i].x;
    let circle_y = points[i].y;

    //円の中心点(p,q)
    const radius = (x, y, p, q) => {
      return Math.sqrt((x - p) * (x - p) + (y - q) * (y - q));
    };

    for (let q = min_y; q < max_y; q++) {
      for (let p = min_x; p < max_x; p++) {
        let r = radius(circle_x, circle_y, p, q);
        if (r >= max_r * 0.8 && r < max_r * 1.2) {
          center_points.push({ p: p, q: q, r: r });
        }
      }
    }
  }

  let counts = {};
  for (let j = 0; j < center_points.length; j++) {
    let key = JSON.stringify(center_points[j]);
    counts[key] = counts[key] ? counts[key] + 1 : 1;
  }

  let invArr = _.invert(counts);

  let circles = [];
  for (
    let k = Object.keys(invArr).length;
    k > Object.keys(invArr).length - 3;
    k--
  ) {
    const circle = JSON.parse(invArr[k]);
    circles.push(circle);
  }

  const aveCircle = {
    p: _.sumBy(circles, 'p') / circles.length,
    q: _.sumBy(circles, 'q') / circles.length,
    r: _.sumBy(circles, 'r') / circles.length
  };

  return aveCircle;
};
