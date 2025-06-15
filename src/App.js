import { Segment } from 'semantic-ui-react';
import './App.css';
import Rotas from './Routes/Rotas';
import GlobalStyles from './styles/GlobalStyles';


function App() {

  return (

    <div className="App">

      <GlobalStyles/>
      <Rotas />

      <div style={{ marginTop: '10%' }}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2025 - Projeto Bibliotech - IFPE Jaboatão dos Guararapes.
        </Segment>
      </div>

    </div>

  );
}
export default App;
