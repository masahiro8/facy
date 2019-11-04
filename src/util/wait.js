export const wait = minsec => {
  return new Promise(resolved => {
    setTimeout(() => {
      resolved();
    }, minsec);
  });
};
