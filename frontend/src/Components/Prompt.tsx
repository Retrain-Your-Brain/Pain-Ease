import { useCallback, useEffect, useRef, useState } from "react";

const PromptComponent = () => {
  const [input, setInput] = useState("");
  const fetchInitialDataRef = useRef<boolean>(false);

  const handleClick = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:5050/generate-exercise-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Exercise Plan:", data);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  }, [input]);

  useEffect(() => {
    if (!fetchInitialDataRef.current) {
      fetchInitialDataRef.current = true;

      const fetchSampleData = async () => {
        try {
          const res = await fetch("http://localhost:5050/example-back-pain-response", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          const data = await res.json();
          console.log("Back Pain Exercise Plan:", data);
        } catch (err) {
          console.error("Fetch failed:", err);
        }
      };

      fetchSampleData();
    }
  }, []);

  return (
    <div>
      <input
        id="prompt"
        type="text"
        placeholder="Enter prompt"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="pl-10 pr-4 mt-60 py-2 w-full rounded-md border border-gray-300"
      />
      <button className="border border-gray-800 p-2 m-4 rounded" onClick={handleClick}>
        Send
      </button>
    </div>
  );
};

export default PromptComponent;
