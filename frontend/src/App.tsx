import { Provider } from "react-redux";
import "./App.css";
import Home from "./Components/home/Home";
import PromptComponent from "./Components/Prompt";
import { store } from "./store/store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/login/Login";
import Profile from "./Components/Profile/Profile";
import Dashboard from "./Components/Dashboard/Dashboard";
import Private from "./Components/Navbar/PrivateNavbar";
import Public from "./Components/Navbar/PublicNavbar";

function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return (
    <Provider store={store}>
      <BrowserRouter>
        {user ? <Private /> : <Public />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/exercisePlan" element={<PromptComponent />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
