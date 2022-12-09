import '../styles/PlacaAdd.css'
import { Search } from "@mui/icons-material";
import { IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import logo from './../resources/logo-completo.png';

function PlacaAdd() {
  const [placa, setPlaca] = useState('')
  const navigate = useNavigate()
  const handleChange = event => {
    console.log(    window.location.href +'info-placa'    )
    setPlaca(event.target.value.toUpperCase());
    sessionStorage.setItem("placa", event.target.value);
    console.log('value is:', placa);
  };

  const handleSummit = (event) => {
    event.preventDefault();
    navigate('info-placa')
  
  }
  return (
    <div className="bgimg">


      <div className="white-background-card vertical-center text-center">
        <img className="logo-parking" src={logo} alt="logo completo parking"/>
        <form onSubmit={handleSummit}>
          <Box sx={{ paddingBottom: 10 }}
            noValidate
            autoComplete="off"
            type='button'
          >
          <FormControl sx={{ width: '50%' }}>
            <InputLabel htmlFor="placa-input">Buscar placa</InputLabel>
            <OutlinedInput fullWidth 
              type='input'
              value={placa}
              onChange={handleChange}
              className="placa-input"
              id="placa-input"
              label="Ingrese su placa"
              variant="outlined"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    aria-label="Search"
                    edge="end"
                  >
                    <Search/>
                  </IconButton>
                </InputAdornment>
              }
              />
            </FormControl>
          </Box>
        </form>
      </div>
      <footer>

      </footer>
    </div>
  );



}

export default PlacaAdd;