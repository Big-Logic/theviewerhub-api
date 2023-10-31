const Post = require("../model/posts");
const factory = require("../controllers/handlerFactory");

exports.getAllPosts = factory.getMany(Post, "", {
  path: "creater",
  select: "profilePicture firstName middleName lastName",
});

exports.getOnePost = factory.getOne(Post, "", "creater");

//
exports.bodyExtractionMiddlewareCreate = (req, res, next) => {
  const { postPicture, postCaption } = req.body;
  req.body = { postPicture, postCaption, creater: req.session.user.id };
  next();
};
exports.createPost = factory.createDoc(Post);

//
exports.bodyExtractionMiddlewareUpdate = (req, res, next) => {
  const { postPicture, postCaption } = req.body;
  req.body = { postPicture, postCaption };
  next();
};
exports.updatePost = factory.updateOne(Post);

exports.deletePost = factory.deleteOne(Post);
