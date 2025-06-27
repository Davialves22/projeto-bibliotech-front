import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Segment } from "semantic-ui-react";
import "./App.css";
import Rotas from "./Routes/Rotas";
import GlobalStyles from "./styles/GlobalStyles";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <GlobalStyles />

      <Rotas />

      <div style={{ marginTop: "0" }}>
        <Segment vertical color="grey" size="tiny" textAlign="center">
          &copy; 2025 - Projeto Bibliotech - IFPE Jaboatão dos Guararapes.
        </Segment>
      </div>
    </div>
  );
}
export default App;
