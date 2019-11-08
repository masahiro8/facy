//canvasでマスク
//https://qiita.com/keiskimu/items/140e6b8c7b81bf01d390
//pathをpathでマスクするには本当はclipかもしれない
//http://www.htmq.com/canvas/clip.shtml

export const maskDraw = (canvas, points, shift, rate) => {
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'red';
  ctx.save();
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
  ctx.clip();
};

export const drawLense = (canvas, circle) => {
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d');

  //円を描画
  let grd = ctx.createRadialGradient(
    circle.p,
    circle.q,
    5,
    circle.p,
    circle.q,
    circle.r
  );
  grd.addColorStop(0, 'rgba(13,13,13,0.5)');
  grd.addColorStop(0.5, 'rgba(242,172,87,0.75)');
  grd.addColorStop(1, 'rgba(115, 83, 44, 0.65)');
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.arc(circle.p, circle.q, circle.r * 1.4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
};

export const clearLense = canvas => {
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, rect.width, rect.height);
};
