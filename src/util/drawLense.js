import * as _ from "lodash";
//canvasでマスク
//https://qiita.com/keiskimu/items/140e6b8c7b81bf01d390
//pathをpathでマスクするには本当はclipかもしれない
//http://www.htmq.com/canvas/clip.shtml

const upperindex = [37, 38, 43, 44]; //下
const downindex = [47, 46, 41, 40]; //上

export const maskDraw = (canvas, points, shift, rate) => {
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    //上下のマスク領域を調節
    let _y = points[i].point.y;
    if (_.indexOf(upperindex, points[i].index) > 0) {
      _y = _y * 1.0;
    } else if (_.indexOf(downindex, points[i].index) > 0) {
      _y = _y * 1.05;
    }

    if (i == 0) {
      ctx.moveTo(
        Math.floor(points[0].point.x * rect.width * rate.x + shift.x),
        Math.floor(_y * rect.height * rate.y + shift.y)
      );
    } else {
      ctx.lineTo(
        Math.floor(points[i].point.x * rect.width * rate.x + shift.x),
        Math.floor(_y * rect.height * rate.y + shift.y)
      );
    }
  }
  ctx.closePath();
  ctx.fill();
};

const SCALE = 1.0;

export const drawLense = (canvas, circle, data) => {
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d");

  const lens = new Image();
  lens.src = data;

  //円を描画
  lens.onload = function() {
    ctx.globalCompositeOperation = "source-in";
    // ctx.globalAlpha = 0.8; //透明度
    ctx.drawImage(
      lens,
      circle.p - circle.r,
      circle.q - circle.r,
      circle.r * 2,
      circle.r * 2
    );
  };
  ctx.restore();
};

export const clearLense = canvas => {
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, rect.width, rect.height);
};
