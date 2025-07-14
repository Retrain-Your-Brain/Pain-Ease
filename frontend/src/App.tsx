
import { Provider } from "react-redux";
import "./App.css";
import Home from "./Components/home/Home";
import PromptComponent from './Components/Prompt'
import { store } from "./store/store";
import { DescriptionAlerts } from "./Components/Alert/AlertMessage";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Register  from  "./Components/Register/Register";
import Login from "./Components/login/Login";
import Profile from "./Components/Profile/Profile";


function App() {
  return (
    <Provider store={store}>
      <Router>
      <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/prompt' element={<PromptComponent/>} />
      </Routes>
      </Router>
    </Provider>
  );
}

export default App;
