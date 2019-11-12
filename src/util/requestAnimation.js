const _requestAnimation = fps => {
  let callbacks = [];
  const update = () => {
    for (let i = 0; i < callbacks.length; i++) {
      callbacks[i]();
    }
    start();
  };
  const start = () => {
    requestAnimationFrame(update);
  };
  const setCallback = callback => {
    callbacks.push(callback);
  };
  return {
    start,
    setCallback
  };
};

export const requestAnimation = _requestAnimation(5);
