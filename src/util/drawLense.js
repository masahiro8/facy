//canvasでマスク
//https://qiita.com/keiskimu/items/140e6b8c7b81bf01d390
//pathをpathでマスクするには本当はclipかもしれない
//http://www.htmq.com/canvas/clip.shtml

export const maskDraw = (canvas, points, shift, rate) => {
  const drawLine = (_points, _rect, index, _shift, _rate) => {
    const nextIndex = _points.length == index + 1 ? 0 : index + 1; //_points.lengthと一緒ならなら原点へ
    ctx.moveTo(
      Math.floor(_points[index].point.x * _rect.width * _rate.x + shift.x),
      Math.floor(_points[index].point.y * _rect.height * _rate.y + shift.y)
    );
    ctx.lineTo(
      Math.floor(_points[nextIndex].point.x * _rect.width * _rate.x + shift.x),
      Math.floor(_points[nextIndex].point.y * _rect.height * _rate.y + shift.y)
    );

    if (_points.length == index + 1) {
      // ctx.clip();
      ctx.stroke();
    } else {
      drawLine(_points, _rect, nextIndex, _shift, _rate);
    }
  };

  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  drawLine(points, rect, 0, shift, rate);
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
    circle.r * 1.02
  );
  grd.addColorStop(0, 'rgba(13,13,13,0.5)');
  grd.addColorStop(0.5, 'rgba(242,172,87,0.75)');
  grd.addColorStop(1, 'rgba(115, 110, 110, 0.65)');
  ctx.fillStyle = grd;

  ctx.beginPath();
  ctx.arc(circle.p, circle.q, circle.r, 0, 2 * Math.PI);
  ctx.fill();

  //中心点を描画
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(circle.p, circle.q, 1, 1);
};

export const clearLense = canvas => {
  const rect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, rect.width, rect.height);
};
