import { Request, Response } from "express";
import Reply from "../models/reply";
import Post from "../models/post";

const ReplyControl = {
  add: async (req: Request, res: Response) => {
    try {
      const { reply } = req.body;
      const { postId } = req.params;
      const userId = req.user?.id;
      const img = req.file ? `/uploads/${req.file.filename}` : null;

      await Reply.create({
        author: userId,
        post: postId,
        reply,
        img,
      });
      const post = await Post.findById(postId).populate<{ author: { email: string; username: string; id: string } }>(
        "author",
        "email username",
      );
      if (post && post.author.id.toString() !== userId) {
        console.log(`Notify ${post.author.email}: New reply from ${req.user?.username}`);
      }
      res.status(201).json({ message: "reply added" });
    } catch (err: any) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  },

  getReplies: async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const replies = await Reply.find({ post: postId }).populate("author", "email username").sort({ createdAt: -1 });
      res.status(201).json({ replies });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
};

export default ReplyControl;
