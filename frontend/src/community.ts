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
      const token=localStorage.getItem('token')
    const response = await axios.get("http://localhost:5000/get-posts", {
      headers:{
          Authorization:`Bearer ${token}`
      }
    });
    return response.data;
  }
};
