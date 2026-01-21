import PostControl from "../controllers/communityController";
import ReplyControl from "../controllers/replyController";
import upload from "../middleware/image";
import isAuthenticated from "../middleware/isAuth";

const express = require("express");

const PostRouter = express.Router();

PostRouter.post(
  "/create",
  upload.single("image"),
  isAuthenticated,
  PostControl.add
);
PostRouter.get("/get-posts", isAuthenticated, PostControl.all);
PostRouter.get("/my-post", isAuthenticated, PostControl.myPost);
PostRouter.post("/like/:postId", isAuthenticated, PostControl.like);
PostRouter.post(
  "/add/:postId",
  upload.single("image"),
  isAuthenticated,
  ReplyControl.add
);
PostRouter.get("/get/:postId", isAuthenticated, ReplyControl.getReplies);

export default PostRouter;