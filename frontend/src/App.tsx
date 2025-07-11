
import { Provider } from "react-redux";
import "./App.css";
import { Navbar } from "./Components/Navbar/Navbar";
import PromptComponent from './Components/Prompt'
import { store } from "./store/store";
import { DescriptionAlerts } from "./Components/Alert/AlertMessage";

function App() {
  return (
    <Provider store={store}>
      <h1>Prompt Sender</h1>
      <Navbar />
      <PromptComponent/>
      <DescriptionAlerts />
    </Provider>
  );
}

export default App;
