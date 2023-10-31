const { Readable } = require("stream");
const cloudinary = require("cloudinary").v2;
const errorCatcher = require("./errorCatcher");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadStream(buffer, resourcePublicId) {
  return new Promise((res, rej) => {
    const theTransformStream = cloudinary.uploader.upload_stream(
      {
        public_id: resourcePublicId,
        folder: "myprofile",
      },
      (err, result) => {
        if (err) return rej(err);
        return res(result);
      }
    );
    let str = Readable.from(buffer);
    str.pipe(theTransformStream);
  });
}

module.exports = (uploadType) =>
  errorCatcher(async (req, res, next) => {
    console.log(req.pictureIds, "lp");

    const resourcePublicId = req.pictureIds[uploadType];
    const cloudinaryResponse = await uploadStream(
      req.file.buffer,
      resourcePublicId
    );

    req.uploadedPicDetail = {
      publicId: cloudinaryResponse.public_id.split("/")[1],
      url: cloudinaryResponse.secure_url,
      uploadType,
    };
    next();
  });
