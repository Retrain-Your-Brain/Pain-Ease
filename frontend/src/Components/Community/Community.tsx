import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faCommentDots,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  getAPI,
  getReplyAPI,
  likeAPI,
  mypostAPI,
  postApi,
  replyApi,
} from "../../community";
import { useDispatch } from "react-redux";
import { addError } from "../../store/errorSlice";
import { DescriptionAlerts } from "../Alert/AlertMessage";
import { ClassNames } from "@emotion/react";
library.add(faImage, faCommentDots, faHeart);

export default function Community() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [replyText, setReplyText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [posts, setPosts] = React.useState<any[]>([]);
  const [comments, setComments] = useState(false);
  const [img, setImg] = useState<File | null>(null);
  const [replies, setReplies] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showMypost, setShowMyPost] = useState(false);
  const [showAllpost, setShowAllPost] = useState(true);
  const [mypost, setmyPost] = React.useState<any[]>([]);
  const [like, setLike] = useState(0);
  const dispatch = useDispatch();
  // post
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await postApi({ content, image: image ?? undefined });
      setContent("");
      setImage(null);
      setIsOpen(false); // close modal after success
      await loadPosts();
    } catch (err: any) {
      const message = err.message || "Something went wrong.";
      dispatch(addError(message));
    }
  };

  const handleLike = React.useCallback(
    async (postId: string) => {
      try {
        const data = await likeAPI({ postId });
        setLike(data);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: { count: data.count },
                  likedByUser: data.liked,
                }
              : post
          )
        );
        setmyPost((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: { count: data.count },
                  likedByUser: data.liked,
                }
              : post
          )
        );
      } catch (err: any) {
        const message = err.message || "Something went wrong.";
        console.log(err.message);
        dispatch(addError(message));
      }
    },
    [dispatch]
  );

  // comment
  const handleClick = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await replyApi({
        reply: replyText,
        img: img ?? undefined,
        postId: selectedPost._id,
      });
      setReplyText("");
      setImg(null);

      setSuccess("added successfully");
      setTimeout(() => setSuccess(""), 2000);
      await loadReplies();
      setTimeout(() => setComments(false), 800);
    } catch (err: any) {
      const message = err.message || "Something went wrong.";
      dispatch(addError(message));
    }
  };

  const myPosts = React.useCallback(async () => {
    try {
      const data = await mypostAPI();
      setLikedPosts(
        data.filter((p: any) => p.likedByUser).map((p: any) => p._id)
      );
      setmyPost(data);
      console.log(data);
    } catch (err: any) {
      const message = err.message || "Something went wrong.";
      console.log(err.message);
      dispatch(addError(message));
    }
  }, [dispatch, setmyPost]);

  const loadReplies = React.useCallback(async () => {
    try {
      if (!selectedPost || !selectedPost._id) return;
      const data = await getReplyAPI(selectedPost._id);
      setReplies(data.replies);
      console.log("Fetched replies:", data.replies);
      setSuccess("added successfully");
      setTimeout(() => setSuccess(""), 1000);
    } catch (err: any) {
      const message = err.message || "Something went wrong.";
      console.log(err.message);
      dispatch(addError(message));
    }
  }, [dispatch, selectedPost]);

  React.useEffect(() => {
    if (!selectedPost || !selectedPost._id) return;
    loadReplies().then(() => setLoading(false));
  }, [selectedPost]);

  const loadPosts = React.useCallback(async () => {
    try {
      const data = await getAPI();
      setPosts(data);
      setLikedPosts(
        data.filter((p: any) => p.likedByUser).map((p: any) => p._id)
      );
      setSuccess("added successfully");
      setTimeout(() => setSuccess(""), 1000);
    } catch (err: any) {
      const message = err.message || "Something went wrong.";
      console.log(err.message);
      dispatch(addError(message));
    }
  }, [dispatch]);

  React.useEffect(() => {
    loadPosts().then(() => setLoading(false));
  }, [loadPosts]);

  return (
    <div className="absolute bg-gradient-to-br from-pink-100 via-fuchsia-100 to-purple-100 shadow-inner mt-24 min-w-screen -ml-30 z-0">
  <DescriptionAlerts />
  <div className="fixed top-1/4 left-6 flex flex-col space-y-6 z-50">
  <button
    className="rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-500 text-white px-6 py-3 font-semibold shadow-md hover:from-purple-500 hover:to-fuchsia-600 transform transition duration-300 ease-in-out hover:scale-105"
    onClick={() => {
      loadPosts();
      setShowAllPost(true);
      setShowMyPost(false);
    }}
  >
    All Posts
  </button>

  <button
    className="rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-500 text-white px-6 py-3 font-semibold shadow-md hover:from-fuchsia-500 hover:to-pink-600 transform transition duration-300 ease-in-out hover:scale-105"
    onClick={() => {
      myPosts();
      setShowMyPost(true);
      setShowAllPost(false);
    }}
  >
    Your Posts
  </button>

  <button
    className="rounded-full bg-gradient-to-r from-indigo-400 to-violet-500 text-white px-6 py-3 font-semibold shadow-md hover:from-indigo-500 hover:to-violet-600 transform transition duration-300 ease-in-out hover:scale-105"
    onClick={() => setIsOpen(true)}
  >
    Create Post
  </button>
</div>


      <Dialog
        open={comments}
        onClose={() => {
          setComments(false);
          setSuccess("");
        }}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-white p-6 shadow-xl flex flex-col">
            {/* Post Header */}
            <div className="border-b pb-4">
              <p className="text-lg font-semibold text-gray-800">
                {selectedPost?.content}
              </p>
              {selectedPost?.image && (
                <img
                  src={`http://localhost:5000${selectedPost.image}`}
                  alt="Post Image"
                  className="mt-3 rounded-lg max-h-30 max-w-30 w-full object-cover"
                />
              )}
            </div>

            {/* Replies Section */}
            <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1 custom-scrollbar">
              {replies.length > 0 ? (
                replies.map((reply: any) => (
                  <div
                    key={reply._id}
                    className="border rounded-lg p-3 shadow-sm bg-gray-50"
                  >
                    <p className="text-sm text-gray-800">{reply.reply}</p>
                    {reply.img && (
                      <img
                        src={`http://localhost:5000/uploads/${reply.img}`}
                        alt="Reply Image"
                        className="mt-2 max-h-40 w-full rounded-lg object-cover"
                      />
                    )}
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(reply.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center">
                  No replies yet.
                </p>
              )}
            </div>

            {/* Reply Form */}
            <form onSubmit={handleClick} className="mt-4">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg p-3 text-sm resize-none"
                rows={3}
              />

              {img && (
                <img
                  src={URL.createObjectURL(img)}
                  alt="Preview"
                  className="mt-3 max-h-40 w-full rounded-lg object-cover"
                />
              )}

              <div className="flex justify-between items-center mt-3">
                <label className="cursor-pointer">
                  <FontAwesomeIcon
                    icon={faImage}
                    size="lg"
                    className="text-gray-500 hover:text-blue-500 transition-colors"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) setImage(e.target.files[0]);
                    }}
                    className="hidden"
                  />
                </label>

                <button
                  type="submit"
                  className="bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Reply
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSuccess("");
        }}
        className="relative z-50"
      >
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
        />

        {/* Modal container */}
        <div className="fixed inset-0 flex items-center justify-center p-4 ">
          <DialogPanel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl transition-all flex flex-col space-y-4 ">
            {/* Title */}
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Create a Post
            </DialogTitle>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Textarea */}
              <textarea
                name="content"
                placeholder="What's on your mind?"
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-28 resize-none border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400"
              />

              {/* Success message */}
              {success && (
                <div className="text-green-600 font-medium">{success}</div>
              )}

              {/* Image preview */}
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="max-h-40 w-full rounded-lg object-cover"
                />
              )}

              {/* Footer buttons */}
              <div className="flex justify-between items-center pt-2">
                <label className="cursor-pointer">
                  <FontAwesomeIcon
                    icon={faImage}
                    size="lg"
                    className="text-gray-500 hover:text-indigo-500 transition"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) setImage(e.target.files[0]);
                    }}
                    className="hidden"
                  />
                </label>

                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium shadow hover:bg-indigo-500 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {showMypost && (
  <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 ">
    {!loading && (mypost.length ?? 0) === 0 && (
      <p className="text-center text-gray-500 text-lg">No posts found.</p>
    )}

    {!loading &&
      (mypost.length ?? 0) > 0 &&
      mypost.map((post) => (
        <div
          key={post._id}
          className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-6"
        >
          {/* Post Content */}
          <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-medium">
            {post.content}
          </p>

          {/* Post Image */}
          {post.image && (
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
              <img
                src={`http://localhost:5000${post.image}`}
                alt="Post"
                className="w-full h-auto max-h-96 object-contain"
              />
            </div>
          )}

          {/* Meta Info */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-4">
            {/* Author */}
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
                {post.author.username}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-5">
              {/* Comment Icon */}
              <FontAwesomeIcon
                icon={faCommentDots}
                size="lg"
                className="text-gray-400 hover:text-blue-500 cursor-pointer transition duration-200"
                onClick={() => {
                  setSelectedPost(post);
                  setComments(true);
                  
                }}
              />

              {/* Like Icon */}
              <div className="flex items-center space-x-1">
                <FontAwesomeIcon
                  icon={faHeart}
                  size="lg"
                  className={`cursor-pointer transition duration-300 ${
                    likedPosts.includes(post._id)
                      ? "text-red-500 scale-110"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                  onClick={() => handleLike(post._id)}
                />
                <span className="text-gray-600 text-sm font-medium">
                  {post.likes.count || 0}
                </span>
              </div>
            </div>

            {/* Timestamp */}
            <div className="text-gray-400 text-xs flex items-center space-x-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
  </div>
)}


      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600" />
          </div>
        )}

        {/* No Posts Message */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-20">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              No posts found
            </h3>
            <p className="mt-1 text-gray-500">
              Be the first to share something!
            </p>
          </div>
        )}

        {/* Posts List */}
        {!loading &&
          showAllpost &&
          posts.map((post) => (
            <div
              key={post._id}
              className="p-6 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition duration-300 group"
            >
              {/* Post Content */}
              <p className="text-gray-900 text-lg font-medium leading-relaxed">
                {post.content}
              </p>

              {/* Image Section */}
              {post.image && (
                <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                  <img
                    src={`http://localhost:5000${post.image}`}
                    alt="Post"
                    className="w-50 h-50 ml-60 object-cover rounded-lg group-hover:scale-[1.01] transition-transform duration-300"
                  />
                </div>
              )}

              {/* Post Footer */}
              <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-4">
                {/* Author */}
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                  {post.author.username}
                </span>

                {/* Actions: Comments + Likes */}
                <div className="flex items-center gap-5">
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    size="lg"
                    className="text-gray-400 hover:text-indigo-500 transition cursor-pointer"
                    onClick={() => {
                      setSelectedPost(post);
                      setComments(true);
                    }}
                  />

                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      className={`cursor-pointer transition-transform ${
                        likedPosts.includes(post._id)
                          ? "text-red-500 scale-110"
                          : "text-gray-400 hover:text-red-400 hover:scale-105"
                      }`}
                      onClick={() => handleLike(post._id)}
                    />
                    <span className="text-gray-600 text-sm">
                      {post.likes.count || 0}
                    </span>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="text-gray-400 text-xs flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
