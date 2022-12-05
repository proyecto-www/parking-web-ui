import '../styles/PlacaAdd.css'
import { Search } from "@mui/icons-material";
import { IconButton } from '@mui/material';
import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import logo from './../resources/logo-completo.png';

function PlacaAdd() {
  const [placa, setPlaca] = useState('')
  const navigate = useNavigate()
  const handleChange = event => {
    setPlaca(event.target.value.toUpperCase());
    sessionStorage.setItem("placa", event.target.value);
    console.log('value is:', placa);
  };

  const handleClick = () => {
    navigate('info-placa')
  }
  return (
    <div className="bgimg">


      <div className="placa-add vertical-center">
        <img className="logo-parking" src={logo} width={300} height={300} alt="logo completo parking"/>
        <form className="placa-add-form">
          {/* <input className="placa-add-form-input" type='text' placeholder="" size='10' name='placa' onChange={handleChange}
                        value={placa} /> */}
          <Box sx={{paddingBottom: 10}}
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField className="placa-input" id="standard-basic" label="Ingrese su placa" variant="outlined" width={70}/>
            <IconButton aria-label="buscar" onClick={handleClick}>
              <Search />
            </IconButton>
          </Box>

        </form>
      </div>
      <footer>

      </footer>
    </div>
  );



}

export default PlacaAdd;