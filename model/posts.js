const { Schema, model } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const postSchema = new Schema(
  {
    postPicture: {
      type: {
        publicId: {
          type: String,
          default: uuidv4(),
        },
        url: {
          type: String,
          default: "",
        },
      },
      default: {},
    },

    postCaption: {
      type: String,
      default: "",
    },
    creater: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "CreaterId is required"],
    },
    latest: {
      type: Boolean,
      default: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false, toJSON: true, toObject: true }
);

const Post = model("posts", postSchema);

module.exports = Post;
