import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import logo from './../resources/logo.png';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect,useContext } from 'react';
import { AccountContext } from "../components/Account";

export default function ButtonAppBar() {
  const { authenticate, getSession } = useContext(AccountContext)

  const navigate = useNavigate()
  const [isLogged, setIsLogged] = useState(false)
  const [email, setEmail] = useState('')
  const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    },
  });

  const goHome = () => {
    navigate('/')

  }

  const goLogin = ()=>[
    navigate('/login')
  ]

  useEffect(()=>{
    console.log(email)
    getSession()
    .then((session)=>{
      setIsLogged(true)
      setEmail(sessionStorage.getItem('email'))
    })
    .catch((err)=>{
        console.error(err)
    })
})

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* HACER: mostrar logo de la aplicacion */}
            <Box >
              <img src={logo} heigth={56} width={56} alt="Este es el logo de el parqueadero"/>
          </Box>
            <Typography onClick={goHome} variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Parking
            </Typography>
            <Button onClick={goLogin} color="inherit">{isLogged? email:'Login'}</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
