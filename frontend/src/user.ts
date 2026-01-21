import axios from "axios";

export const data = async ({ prompt }: { prompt: string }) => {
  const response = await axios.post("http://localhost:5050/prompt", {
    prompt,
  });

  return response.data;
};

export const registerApi = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post("http://localhost:5050/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const LoginAPI = async ({ email, password }: { email: string; password: string }) => {
  {
    const response = await axios.post("http://localhost:5050/login", {
      email,
      password,
    });

    return response.data;
  }
};

export const updateAPI = async ({ username, email }: { email: string; username: string }) => {
  const token = localStorage.getItem("token");
  {
    const response = await axios.post(
      "http://localhost:5050/update",
      {
        email,
        username,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
};

export const passwordAPI = async ({ password }: { password: string }) => {
  const token = localStorage.getItem("token");
  {
    const response = await axios.post(
      "http://localhost:5050/password",
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};
