import '../styles/PlacaAdd.css'
import { Search } from "@mui/icons-material";
import { IconButton } from '@mui/material';
import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';

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

                    <IconButton aria-label="buscar" onClick={handleClick}>
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