import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React, { useCallback, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router-dom";
import { getAPI, postApi } from "../../community";
import { useAppSelector } from "../../store/store";
import { useDispatch } from "react-redux";
import { addError } from "../../store/errorSlice";
import { DescriptionAlerts } from "../Alert/AlertMessage";
library.add(faImage);

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Community() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [posts, setPosts] = React.useState<any[]>([]);

  const dispatch = useDispatch();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await postApi({ content, image: image ?? undefined });
    setContent("");
    setImage(null);
    setIsOpen(false); // close modal after success
    await loadPosts();
  };

  const loadPosts = React.useCallback(async () => {
    try {
      const data = await getAPI();
      console.log("fetched posts", data);
      setPosts(data);
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
    <div>
      <DescriptionAlerts />
      <div className=" flex justify-center bg-gradient-to-br  mt-20  py-10 ">
        <div className="flex space-x-20">
          <button className=" rounded-3xl bg-fuchsia-100 h-12 w-30 hover:bg-fuchsia-300 " onClick={loadPosts}>
            All posts
          </button>
          <button className=" rounded-3xl bg-fuchsia-100 h-12 w-30  hover:bg-fuchsia-300 ">
            Your posts
          </button>
          <button
            className="rounded-3xl bg-fuchsia-100 h-12 w-30  hover:bg-fuchsia-300 "
            onClick={() => setIsOpen(true)}
          >
            Create post
          </button>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSuccess("");
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Create a post
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <div className="mt-4 space-y-4 ">
                <div>
                  <textarea
                    name="content"
                    placeholder="What's on your mind?"
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 block w-full rounded-md border h-100 border-gray-300 px-3 py-2 placeholder:align-top  "
                  />
                </div>
                {success && (
                  <div className="text-green-600 font-semibold mb-4">
                    {success}
                  </div>
                )}

                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="mt-2 max-h-40 rounded"
                  />
                )}

                <div className="flex items-center justify-between">
                  <label>
                    <FontAwesomeIcon
                      icon={faImage}
                      size="2x"
                      className="text-gray-400 "
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

                  <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="max-w-3xl mx-auto p-4 space-y-6">
        {loading && <p>Loading posts...</p>}
        {!loading && posts.length === 0 && <p>No posts found.</p>}
        {!loading &&
          posts.map((post) => (
            <div key={post._id} className="p-4 border rounded shadow">
              <p>{post.content}</p>
              {post.image && (
                <img
                src= {`${BASE_URL}${post.image}`}
                  alt="Post"
                  className="max-w-full max-h-60 mt-2"
                />
              )}
              <p className="text-sm text-gray-500 mt-2">
                By: {post.author.username}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(post.createdAt).toDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
