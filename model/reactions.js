const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reaction: {
      type: String,
      required: [true, "Reaction is required"],
    },
    postId: {
      type: String,
      required: [true, "postId is required"],
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

reactionSchema.index({ postId: 1, creater: 1 }, { unique: true });

const Reaction = model("reactions", reactionSchema);

module.exports = Reaction;
