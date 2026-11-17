const ImageKit = require("@imagekit/nodejs");

console.log(
  "ImageKit private key loaded:",
  Boolean(process.env.IMAGEKIT_PRIVATE_KEY)
);

console.log(
  "Private key format:",
  process.env.IMAGEKIT_PRIVATE_KEY?.startsWith("private_")
);

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

module.exports = imagekit;