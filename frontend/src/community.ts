import axios from "axios";

export const postApi = async ({
  content,
  image,
}: {
  content: string;
  image?: File;
}) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("content", content);
    if (image) {
      formData.append("image", image); // Must match multer field name (req.file)
    }

    const response = await axios.post(
      "http://localhost:5000/create",

      formData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAPI = async () => {
  {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:5000/get-posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
};

export const replyApi = async ({
  reply,
  img,
  postId,
}: {
  reply: string;
  img?: File;
  postId: string;
}) => {
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("reply", reply);
    if (img) {
      formData.append("img", img); // Must match multer field name (req.file)
    }

    const response = await axios.post(
      `http://localhost:5000/add/${postId}`,

      formData,

      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getReplyAPI = async (postId: string) => {
  {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:5000/get/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
};

export const mypostAPI = async () => {
  {
    const token = localStorage.getItem("token");
    const response = await axios.get(`http://localhost:5000/my-post`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
};

export const likeAPI = async ({ postId }: { postId: string }) => {
  const token = localStorage.getItem("token");
  {
    const response = await axios.post(
      `http://localhost:5000/like/${postId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
};
