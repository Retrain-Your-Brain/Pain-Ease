import { Request, Response } from "express";
import Post from "../../model/post";
import mongoose from "mongoose";

const PostControl = {
  add: async (req: Request, res: Response) => {
    try {
      const { content} = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : null;
      const userId = req.user?.id;
      const newPost = await Post.create({
        author: userId,
        content,
        image,
      });
      res.status(201).json({ message: "post has been created", newPost });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  all: async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      const posts = await Post.find()
        .populate("author", "username email")
        .sort({ createdAt: -1 });

        const enrichedPosts = posts.map((post) => {
          const likedByUser = post.likes.some(
            (id) => id.toString() === userId
          );
    
          return {
            ...post.toObject(),
            likedByUser,
            likes: {
              count: post.likes.length,
            },
          };
        });

      res.status(201).json(enrichedPosts);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }

  },
  myPost: async (req: Request, res: Response) => {
    try {
        const userId= req.user?.id
      const posts = await Post.find({author:userId}).sort({createdAt:-1})
        .populate("author", "username email")
      
    const enrichedPosts = posts.map((post) => {
      const likedByUser = post.likes.some(
        (id) => id.toString() === userId
      );

      return {
        ...post.toObject(), 
        likedByUser,
        likes: {
          count: post.likes.length,
        },
      };
    });

    res.status(200).json(enrichedPosts);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
  like: async (req: Request, res: Response) => {
    try {
        const userId= req.user?.id
        const objectUserId = new mongoose.Types.ObjectId(userId);
        const {postId} = req.params
      const post= await Post.findById(postId)
        if(!post){
            return res.status(404).json({message:"post doesn't exists"})
        }
        const alreadyLiked= post.likes.includes(objectUserId)
        if(alreadyLiked){
            post.likes= post.likes.filter(id=> id.toString()!==userId)
        }else{
            post.likes.push(objectUserId)
        }
        await post.save();
        
        return res.status(200).json({
          count: post.likes.length,
          liked:!alreadyLiked,
        })
    } catch (err: any) {
      res.status(500).json({ message: err });
    }
  },
};

export default PostControl;