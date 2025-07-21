import { useEffect, useState } from "react";
import axios from "axios";

const PainChecker = () => {
  const [shouldSuggestChange, setShouldSuggestChange] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPainTrend = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/check-pain");
        if (res.data.suggestPlanChange) {
          setShouldSuggestChange(true);
        }
      } catch (error) {
        console.error("Failed to check pain trend:", error);
      } finally {
        setLoading(false);
      }
    };
    checkPainTrend();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mt-10">
      {shouldSuggestChange && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg  ">
          <p>
            Your pain has been increasing lately. Would you like to{" "}
            <strong>update your recovery plan?</strong>
          </p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Update Plan
          </button>
        </div>
      )}
    </div>
  );
};
export default PainChecker;

