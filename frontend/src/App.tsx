
import { Provider } from "react-redux";
import "./App.css";
<<<<<<< Updated upstream
import { Navbar } from "./Components/Navbar/Navbar";
import PromptComponent from './Components/Prompt'
import { store } from "./store/store";
import { DescriptionAlerts } from "./Components/Alert/AlertMessage";
=======
>>>>>>> Stashed changes

import PromptComponent from './Components/Prompt'
import Home from "./Components/home/Home";
function App() {
  return (
<<<<<<< Updated upstream
    <Provider store={store}>
      <h1>Prompt Sender</h1>
      <Navbar />
=======
    <>

     <Home/>
>>>>>>> Stashed changes
      <PromptComponent/>
      <DescriptionAlerts />
    </Provider>
  );
}

export default App;
