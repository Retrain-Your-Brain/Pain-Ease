import { Provider } from "react-redux";
import "./App.css";
import Home from "./Components/home/Home";
import { store } from "./store/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import Login from "./Components/login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </Provider>
  );
}
export default App;
