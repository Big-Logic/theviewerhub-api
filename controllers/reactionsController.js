const Reaction = require("../model/reactions");
const factory = require("../controllers/handlerFactory");

exports.getAllReactions = factory.getMany(Reaction, "", {
  path: "creater",
  select: "profilePicture firstName middleName lastName",
});

exports.getOneReaction = factory.getOne(Reaction, "", {
  path: "creater",
  select: "profilePicture firstName middleName lastName",
});

//
exports.bodyExtractionMiddlewareCreate = (req, res, next) => {
  const { reaction, postId } = req.body;
  req.body = { reaction, postId, creater: req.session.user.id };
  next();
};
exports.createReaction = factory.createDoc(Reaction);

//
exports.bodyExtractionMiddlewareUpdate = (req, res, next) => {
  const { reaction } = req.body;
  req.body = { reaction };
  next();
};
exports.updateReaction = factory.updateOne(Reaction);

exports.deleteReaction = factory.deleteOne(Reaction);
