import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { prompt } from "../user";

const PromptComponent = () => {
  const [input, setInput] = useState("");

  const mutation = useMutation({
    mutationFn: prompt,
  });

  const handleClick = async () => {
    try {
      const data = await mutation.mutateAsync({ prompt: input });
      console.log("Response:", data);
      // You can clear input or do other stuff here
      setInput("");
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };

  return (
    <div>
      <input
        id="prompt"
        type="text"
        placeholder="Enter prompt"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300"
      />
      <button onClick={handleClick}>Send</button>
    </div>
  );
};

export default PromptComponent;
