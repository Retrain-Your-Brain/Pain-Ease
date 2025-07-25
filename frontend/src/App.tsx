
import { Provider } from "react-redux";
import "./App.css";
import Home from "./Components/home/Home";
import PromptComponent from './Components/Prompt'
import { store } from "./store/store";
import { DescriptionAlerts } from "./Components/Alert/AlertMessage";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Register  from  "./Components/Register/Register";

function App() {
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
    </Provider>
  );
}

export default App;
