import { useCallback, useState } from "react";
import axios from 'axios';

const PromptComponent = () => {
  const [input, setInput] = useState("");

  const handleClick = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/prompt', {
        prompt: input
      });
      setInput("");

    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  },[]);

  return (
    <div>
      <input
        id="prompt"
        type="text"
        placeholder="Enter prompt"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="pl-10 w-50 pr-4 mt-60 py-2 w-full rounded-md border border-gray-300"
      />
      <button
        className="border border-gray-800 p-2 m-4 rounded"
        onClick={handleClick}
      >
        Send
      </button>
    </div>
  );
};

export default PromptComponent;
