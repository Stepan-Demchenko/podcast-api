module.exports = {
  getFullImgPath(imageType, imageName) {
    const BASE_FOLDER = 'uploads/';
    const imagePathEnum = {
      avatar: `${BASE_FOLDER}avatar/`,
      channel: `${BASE_FOLDER}channel/`
    };

    if (imageName && imagePathEnum[imageType]) {
      return imagePathEnum[imageType] + imageName;
    }
    return null;
  }
};
