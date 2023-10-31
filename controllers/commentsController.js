const Comment = require("../model/comments");
const factory = require("./handlerFactory");

//READ ALL COMMENTS
exports.getAllComments = factory.getMany(Comment, "", {
  path: "creater",
  select: "firstName lastName profilePicture",
});

exports.fixAddCommentBody = (req, res, next) => {
  const { comment, profileId } = req.body;
  req.body = { comment, profileId, creater: req.session.user.id };

  next();
};

//READ A COMMENT
exports.getComment = factory.getOne(Comment, "", {
  path: "creater",
  select: "firstName lastName profilePicture",
});

//CREATE A COMMENT
exports.createComment = factory.createDoc(Comment);

//DELETE A COMMENT
exports.deleteComment = factory.deleteOne(Comment);

//UPDATE A COMMENT
exports.updateComment = factory.updateOne(Comment);

//COUNT DOCUMENT
exports.countComments = factory.countDoc(Comment);
