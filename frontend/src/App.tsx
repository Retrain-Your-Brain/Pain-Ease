import { Provider } from "react-redux";
import "./App.css";
import Home from "./Components/home/Home";
import PromptComponent from './Components/Prompt'
import { store } from "./store/store";
import { DescriptionAlerts } from "./Components/Alert/AlertMessage";
import Register  from  "./Components/Register/Register";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Components/login/Login";
import Profile from "./Components/Profile/Profile";
import ValidationBehaviorView from "./Components/Reminder/Reminder";
import Dashboard from "./Components/Dashboard/Dashboard";
import Private from "./Components/Navbar/PrivateNavbar";
import Public from "./Components/Navbar/PublicNavbar";
import Community from "./Components/Community/Community";



function App() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return (
    <Provider store={store}>
      <Router>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<Register/>} />
      <PromptComponent/>

      <DescriptionAlerts />
      </Routes>
      </Router>
      <BrowserRouter>
      {user? <Private/> : <Public/>} 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/prompt" element={<PromptComponent />} />
          <Route path="/reminder" element={< ValidationBehaviorView/>} /> 
          <Route path="/community" element={<Community/>} /> 
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}