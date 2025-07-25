import axios from "axios";

export const data = async ({ prompt }: { prompt: string }) => {
  const response = await axios.post("http://localhost:5000/prompt", {
    prompt,
  });
  return response.data;
};
