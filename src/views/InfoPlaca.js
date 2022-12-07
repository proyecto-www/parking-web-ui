
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
import Loading from '../components/Loading'
import NotFound from '../components/NotFound'
function InfoPlaca(props) {
  const navigate = useNavigate()

  const [existePlaca, setExistePlaca] = useState(false)
  const [datosPlaca, setDatosPlaca] = useState({})
  const [fechaEntrada, setFechaEntrada] = useState('')
  const [fechaSalida, setFechaSalida] = useState('No ha salido')
  const [loading, setLoading] = useState(true)
  const handleClickBack = () => {
    navigate('/')
  }
  useEffect(() => {
    let placa = sessionStorage.getItem('placa')

    const consultarInfo = async () => {
      setLoading(true)
      try {
        let infoPlaca = await axios.get('https://3glc3tjahc.execute-api.us-east-1.amazonaws.com/vehiculos/' + placa)
        setDatosPlaca(infoPlaca.data.body)
        setExistePlaca(true)
      }
      catch (error) {

      }
      finally {
        setLoading(false)

      }
    }
    consultarInfo()
  }, []);

  useEffect(() => {
    const actualizarFecha = () => {
      let horaEntrada = new Date(parseInt(datosPlaca.fechahoraentrada)).toString()
      let horaSalida = new Date(parseInt(datosPlaca.fechahorasalida)).toString()
      setFechaEntrada(horaEntrada)
      if (horaSalida !== 'Invalid Date') {
        setFechaSalida(horaSalida)

      }
    }
    actualizarFecha()
  }, [datosPlaca]);
  return loading ?
    <Loading /> :
    existePlaca ?
      <div className='infoPlaca'>
        <h1>Placa Vehículo {datosPlaca.placa}</h1>
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

      <NotFound></NotFound>


}

export default InfoPlaca;
