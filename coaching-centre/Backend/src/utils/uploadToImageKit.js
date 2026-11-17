const imagekit = require("../config/imagekit");

const uploadToImageKit = async (file, folder) => {
  const response = await imagekit.files.upload({
    file: file.buffer.toString("base64"),
    fileName: `${Date.now()}-${file.originalname}`,
    folder: folder,
  });

  return {
    url: response.url,
    fileId: response.fileId,
    name: response.name,
  };
};

module.exports = uploadToImageKit;