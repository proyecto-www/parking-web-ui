import { Button, TextField } from "@mui/material"
import logo from './../resources/logo-completo.png';
import '../styles/PlacaAdd.css'
import '../styles/Logo.css'
import '../styles/LogInTextFields.css'
import { IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useContext } from 'react';
import { Visibility } from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import { VisibilityOff } from "@mui/icons-material";
import UserPool from '../UserPool'
import { AccountContext } from "../components/Account";
import { CognitoUser, AuthenticaciontDetails, AuthenticationDetails } from "amazon-cognito-identity-js";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { authenticate, getSession } = useContext(AccountContext)
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const navigate = useNavigate()

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        authenticate(email, password)
            .then((data) => {
                navigate("/admin/")
                console.log("Logged in", data)
            })
            .catch((err) => {
                console.log("Failed to login", err)
            })

    };

    const handleChangeEmailTextField = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePasswordTextField = (event) => {
        setPassword(event.target.value)
    }

    useEffect(()=>{
        getSession()
        .then((session)=>{
            navigate('/')
            console.log("Session", session)
        })
        .catch((err)=>{
            console.error(err)
        })
        console.log('estoy ejecutandome',sessionStorage.getItem('email'))
    },[])

    return (
        <div className="white-background-card vertical-center text-center">
            <img className="logo-parking" src={logo} alt="logo completo parking" />
            <form onSubmit={handleSubmit}>
                <div className="login-text-user">
                    <TextField
                        onChange={handleChangeEmailTextField}
                        id="email"
                        label="Email"
                        variant="outlined"
                        type='input'
                        value={email}
                        fullWidth
                        autoComplete="off"
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">

                                    <PersonIcon />

                                </InputAdornment>
                        }}
                    />

                </div>
                <div className="login-text-password">
                    <TextField
                        value={password}
                        id="password"
                        label="Contraseña"
                        variant="outlined"
                        autoComplete="off"
                        type={showPassword ? 'input' : 'password'}
                        fullWidth
                        onChange={handleChangePasswordTextField}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>

                                </InputAdornment>
                        }}
                    />

                </div>
                <div>
                    <Button type="submit">HOLA</Button>
                </div>

            </form>
        </div>
    )


}

export default Login