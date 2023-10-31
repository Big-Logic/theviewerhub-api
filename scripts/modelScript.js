const User = require("../model/users");
const Post = require("../model/posts");
const Comment = require("../model/comments");
const Reaction = require("../model/reactions");
const fs = require("fs/promises");

async function createDocs(Model, fileName) {
  try {
    const fileData = await fs.readFile(
      `${process.cwd()}/testData/${fileName}.json`,
      { encoding: "utf-8" }
    );
    const datas = await Model.create(JSON.parse(fileData));
    console.log("successful");
  } catch (err) {
    console.log(err);
  }
}

async function deleteDocs(Model) {
  try {
    await Model.deleteMany();
    console.log("successfull");
  } catch (err) {
    console.log(err);
  }
}

exports.updateLatest = async function () {
  try {
    const date = Date.now();
    // const tenDaysMilliseconds = 10 * 24 * 60 * 60 * 1000;
    const tenDaysMilliseconds = 10 * 60 * 1000;
    const finalDate = date - tenDaysMilliseconds;

    const updatedProfiles = await Profile.updateMany(
      { createdAt: { $lt: new Date(finalDate) }, latest: true },
      { latest: false }
    );
    // console.log(updatedProfiles);
  } catch (err) {
    console.log(err);
  }
};

exports.updatePopular = async function () {
  try {
    const maxLikes = 2;
    const maxComments = 1;

    const updatedProfiles = await Profile.updateMany(
      { likes: { $gte: maxLikes }, comments: { $gte: maxComments } },
      { popular: true }
    );
    // console.log(updatedProfiles);
  } catch (err) {
    console.log(err);
  }
};

exports.handleCreate = function (modelStr) {
  if (modelStr === "users") {
    createDocs(User, modelStr);
  }
  if (modelStr === "posts") {
    createDocs(Post, modelStr);
  }
  if (modelStr === "comments") {
    createDocs(Comment, modelStr);
  }
  if (modelStr === "reactions") {
    createDocs(Reaction, modelStr);
  }
};
exports.handleDelete = function (modelStr) {
  if (modelStr === "users") {
    deleteDocs(User);
  }
  if (modelStr === "posts") {
    deleteDocs(Post);
  }
  if (modelStr === "comments") {
    deleteDocs(Comment);
  }
  if (modelStr === "reactions") {
    deleteDocs(Reaction);
  }
};
