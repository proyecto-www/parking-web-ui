import '../styles/PlacaAdd.css'
import ButtonDefault from '../components/ButtonDefault';
import { Search } from "@mui/icons-material";
import { IconButton } from '@mui/material';
import axios from 'axios'
import { useState } from 'react';

function PlacaAdd() {

    const [placa, setPlaca] = useState('')

    const handleChange = event => {
        setPlaca(event.target.value);
        sessionStorage.setItem("placa", event.target.value);
        console.log('value is:', event.target.value);
    };
    return (
/*  <header>
            <div className='logo'>
                    <img src='parqueadero.png'></img>
                    <h2 className='logo-h2'>VehicleParking</h2>
                   <button className='logo-btn'> iniciar sesion</button>
                

                </div> 

            </header>
  */      <div>


            <div className="placa-add">
                <h2 className='logo-h2'>VehicleParking</h2>
                <form className="placa-add-form">
                    <label className="placa-add-form-label">Ingrese su placa</label>
                    <input className="placa-add-form-input" type='text' placeholder="" size='10' name='placa' onChange={handleChange}
                        value={placa} />

                    <IconButton aria-label="buscar">
                        <Search />

                    </IconButton>
                </form>
            </div>
            <footer>

            </footer>
        </div>
    );



}

export default PlacaAdd;