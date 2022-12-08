
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios'
import { useState } from 'react';
import '../styles/PlacaAdd.css'
import '../styles/InfoPlaca.css';
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
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      let horaEntrada = new Date(parseInt(datosPlaca.fechahoraentrada)).toLocaleString("es-CO", options)
      let horaSalida = new Date(parseInt(datosPlaca.fechahorasalida)).toLocaleDateString("es-CO", options)
      setFechaEntrada(horaEntrada)
      if (horaSalida !== 'Invalid Date') {
        setFechaSalida(horaSalida)

      }
    }
    actualizarFecha()
  }, [datosPlaca]);
  return (
    <div className='white-background-card vertical-center'>
      {loading ?
        <Loading /> :
        existePlaca ?
          <>
            <Typography variant="h4" sx={{ marginTop: '25px' }} className='text-center'>Vehículo: {datosPlaca.placa}</Typography>
            <div className='infoPlaca'>
              <dl>
                <dt>Fecha entrada</dt>
                <dd>{fechaEntrada}</dd>

                <dt>Fecha Salida</dt>
                <dd>{fechaSalida}</dd>

                <dt>Tipo vehículo</dt>
                <dd>{datosPlaca.tipodevehiculo}</dd>

                <dt>Valor a pagar</dt>
                <dd>$ {datosPlaca.valorPagar || 0}</dd>

                <dt>Tiempo restante</dt>
                <dd>{datosPlaca.tiempoRestante ? datosPlaca.tiempoRestante : 'No ha pagado'}</dd>
              </dl>
            </div>
            <div className='text-center'>
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
            </div>
          </> :
          <NotFound></NotFound>
      }
    </div>
  )

}

export default InfoPlaca;
