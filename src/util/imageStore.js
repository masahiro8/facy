const _imageStore = () => {
  let images = [];

  const setImage = data => {
    images[0] = data;
  };

  const getImage = () => {
    return images[0];
  };

  return {
    setImage,
    getImage
  };
};

export const imageStore = _imageStore();
