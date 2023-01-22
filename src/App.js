import './App.css';
import PlacaAdd from './views/PlacaAdd';
import InfoPlaca from './views/InfoPlaca';
import Login from './views/Login'
import ButtonAppBar from './components/NavBar';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Account } from './components/Account';

function App() {
  return (

    <Router>
      <Account>
        <ButtonAppBar />
        <div className="App">
          <Routes>
            <Route exact path="/" element={<PlacaAdd />} />
            <Route exact path="/info-placa/" element={<InfoPlaca />} />
            <Route exact path='/login' element={<Login />} />
          </Routes>
        </div>
      </Account>
    </Router>

  );
}

export default App;
