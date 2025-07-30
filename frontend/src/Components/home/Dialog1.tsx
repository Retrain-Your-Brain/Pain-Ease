import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { useAppDispatch } from "../../store/store";
import { addError } from "../../store/errorSlice";
import axios from "axios";


type Props={
    isOpen:boolean,
    setIsOpen:(open:boolean) => void,
}

export default function Dialog1({isOpen,setIsOpen}:Props) {
 
  const [success, setSuccess] = useState("");
  const [water, setWater] = useState("");
  const [painScale, setpainScale] = useState("");
  const [notes, setNotes] = useState("");
  const [weight, setWeight] = useState("");
  const dispatch = useAppDispatch();

  const handleButton = async (water: string, painScale: string, notes: string, weight: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/add-symptom",
        { water, painScale, notes, weight },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Symptom added successfully!");
      setTimeout(() => setSuccess(""), 3000);
      setTimeout(() => setIsOpen(false), 500);
      setWater("");
      setWeight("");
      setNotes("");
      setpainScale("");
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const message = err.message;
        dispatch(addError(message));
      }
      setSuccess("");
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
          <DialogTitle className="text-lg font-semibold text-gray-900">Log Today's Symptoms</DialogTitle>
          {success && <div className="text-green-600 font-semibold mb-4">{success}</div>}

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Water (L)</label>
              <input
                type="number"
                name="water"
                value={water}
                onChange={(e) => {
                  setWater(e.target.value);
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Pain Scale (1-10)</label>
              <input
                type="number"
                name="painScale"
                value={painScale}
                onChange={(e) => {
                  setpainScale(e.target.value);
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                min={1}
                max={10}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                name="notes"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                rows={3}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={() => handleButton(water, painScale, notes, weight)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
            >
              Submit
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
