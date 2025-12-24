import { useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { addError } from "../../store/errorSlice";
import Private from "../Navbar/PrivateNavbar";
import { DescriptionAlerts } from "../Alert/AlertMessage";

export default function Profile() {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState(user?.user?.email || "");
  const [username, setUsername] = useState(user?.user?.username || "");
  const [success, setSuccess] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/update",
        { email, username },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Profile updated successfully!");
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const message = err.message || "Something went wrong.";
        dispatch(addError(message));
      }
      setSuccess("");
    }
  };

  const handleButton = async (password: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/password",
        { newPassword: password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Password updated successfully!");
      setPassword("");
      return response.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        const message = err.message || "Something went wrong.";
        dispatch(addError(message));
      }
      setMessage("");
    }
  };

  return (
    <div className="  bg-gradient-to-br from-blue-100 to-white pt-24 h-auto  -ml-30 -mr-30 w-screen mt-20 ">
      <Private />
      <DescriptionAlerts />
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Account Info Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Info</h1>
          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Update Profile Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h1>
            {success && <div className="text-green-600 font-semibold mb-4">{success}</div>}
            <div className="space-y-4">
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-tr from-blue-500 to-teal-500 text-white font-bold py-2 rounded-md hover:opacity-90 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleButton(password);
            }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Change Your Password</h1>
            {message && <div className="text-green-600 font-semibold mb-4">{message}</div>}
            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:opacity-90 transition"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
