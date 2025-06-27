import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Rotas from "./Routes/Rotas";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <GlobalStyles />

      <Rotas />
    </div>
  );
}
export default App;
