const { Schema, model, default: mongoose } = require("mongoose");

const commentsSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "A comment is require"],
    },
    postId: {
      type: String,
      required: [true, "profileId is required"],
    },
    creater: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "CreaterId is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionKey: false, toJSON: true, toObject: true }
);

module.exports = model("Comment", commentsSchema);
