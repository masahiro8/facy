const _three = () => {
  let canvas = null;
  let points = null;

  const setCanvas = canvas => {
    canvas = canvas;
  };

  const setPoints = points => {
    points = points;
  };

  return {
    setCanvas,
    setPoints
  };
};

export const three = _three();
