import './App.css';
import PlacaAdd from './views/PlacaAdd';
import InfoPlaca from './views/InfoPlaca';
import ButtonAppBar from './components/NavBar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
    <ButtonAppBar></ButtonAppBar>
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<PlacaAdd/>} />
          <Route exact path="/info-placa/" element={<InfoPlaca/>} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
