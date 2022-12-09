import { Typography } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import '../styles/PlacaAdd.css'

export default function NotFound() {
    const navigate = useNavigate()
    const handleClickBack = () => {
        navigate('/')
    }
    return (
        <>
            <div style={{
                // display: 'flex',
                // justifyContent: 'center',
                // alignItems: 'center',
                marginTop: '50px',
                marginBottom: '30px',
                // height: '30vh',
            }}
                className='text-center'>
                <Typography variant="h4" sx={{marginBottom: '10px'}}>Vehículo no encontrado</Typography>
                <Typography variant="ph4" >Por favor verifique la placa solicitada e intente de nuevo.</Typography>
            </div>
            <div className='text-center'>
                <Tooltip title="Atrás">
                    <IconButton onClick={handleClickBack} aria-label="Atrás" size="large">
                        <ArrowBackIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </div>
        </>
    );
}
