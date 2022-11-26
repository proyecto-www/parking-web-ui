
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios'
import { useState } from 'react';
import '../styles/InfoPlaca.css'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function InfoPlaca(props) {
  const navigate = useNavigate()

  let placa = sessionStorage.getItem('placa')
  const [existePlaca, setExistePlaca] = useState(false)
  const [datosPlaca, setDatosPlaca] = useState({})
  const [fechaEntrada, setFechaEntrada] = useState('')
  const [fechaSalida, setFechaSalida] = useState('No ha salido')
  const [loading, setLoading] = useState(false)
  const handleClickBack = () => {
    navigate('/')
}
  const consultarInfo = async () => {
    setLoading(true)
    try {
      let infoPlaca = await axios.get('https://3glc3tjahc.execute-api.us-east-1.amazonaws.com/vehiculos/' + placa)
      setDatosPlaca(infoPlaca.data.body)
      setExistePlaca(true)
    }
    catch(error){
      setExistePlaca(false)

    }
    finally{
      setLoading(false)

    }
  }
  const actualizarFecha = () => {
    let horaEntrada = new Date(parseInt(datosPlaca.FechaHoraEntrada)).toString()
    let horaSalida = new Date(parseInt(datosPlaca.FechaHoraSalida)).toString()
    setFechaEntrada(horaEntrada)
    if (horaSalida != 'Invalid Date') {
      setFechaSalida(horaSalida)

    }
    console.log(horaSalida)
  }



  useEffect(() => {
    consultarInfo()
  }, []);

  useEffect(() => {
    actualizarFecha()
  }, [datosPlaca]);
  return loading ? 
    <h1>Esta Cargando men</h1>:
    existePlaca ?
    <div className='infoPlaca'>
      <h1>Placa Vehículo {datosPlaca.Placa}</h1>
      <dl>
        <dt>{fechaEntrada}</dt>
        <dt>{fechaSalida}</dt>
      </dl>

      <p>Hora entrada: hora_entrada</p>
      <p>Valor a pagar hasta el momento: valor_pagar</p>
      <p>Tiempo restante para salir: tiempo_restante</p>
      <Tooltip title="Atrás">
        <IconButton onClick={handleClickBack} aria-label="Atrás" size="large">
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Pagar">
        <IconButton aria-label="Pagar" size="large">
          <AttachMoneyIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Recargar">
        <IconButton aria-label="Recargar" size="large">
          <AutorenewIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </div> :


    <div className='noExiste'>
      <h1>El vehiculo ingresado no se encuentra en el parqueadero</h1>

    </div> 

}

export default InfoPlaca;
