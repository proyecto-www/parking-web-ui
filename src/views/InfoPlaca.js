
import { useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import '../styles/InfoPlaca.css'

function InfoPlaca(props) {
  const params = useParams();
  // HACER: Traer datos del backend usando la placa
  return <div className='infoPlaca'>
    <h1>Placa Vehículo {params.placa}</h1>
    <dl>
      <dt>Fecha entrada</dt>
      <dd>fecha_entrada</dd>
      <dt>Hora entrada</dt>
      <dd>hora_entrada</dd>
    </dl>

    <p>Hora entrada: hora_entrada</p>
    <p>Valor a pagar hasta el momento: valor_pagar</p>
    <p>Tiempo restante para salir: tiempo_restante</p>
    <Tooltip title="Atrás">
      <IconButton aria-label="Atrás" size="large">
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
  </div>;
}

export default InfoPlaca;
