//canvasでマスク
//https://qiita.com/keiskimu/items/140e6b8c7b81bf01d390
//pathをpathでマスクするには本当はclipかもしれない
//http://www.htmq.com/canvas/clip.shtml

export const maskDraw = (canvas, points, shift, rate) => {
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgb(0,0,0)";
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    if (i == 0) {
      ctx.moveTo(
        Math.floor(points[0].point.x * rect.width * rate.x + shift.x),
        Math.floor(points[0].point.y * rect.height * rate.y + shift.y)
      );
    } else {
      ctx.lineTo(
        Math.floor(points[i].point.x * rect.width * rate.x + shift.x),
        Math.floor(points[i].point.y * rect.height * rate.y + shift.y)
      );
    }
  }
  ctx.closePath();
  ctx.fill();
};

const SCALE = 1.0;

export const drawLense = (canvas, circle, data) => {
  // let data = data;

  const lens = new Image();
  lens.src = data;

  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext("2d");

  lens.onload = function() {
    ctx.globalCompositeOperation = "source-in";
    ctx.globalAlpha = 0.8; //透明度
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
