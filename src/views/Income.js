import '../styles/PlacaAdd.css'
import '../styles/Logo.css'
import '../styles/Income.css'
import { Search } from "@mui/icons-material";
import { Button, IconButton, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import logo from './../resources/logo-completo.png';
import axios from 'axios';
import Loading from '../components/Loading'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TimeConverter from '../util/TimeConverter'
import { AccountContext } from '../components/Account';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as React from 'react';
import PriceFormater from '../util/PriceFormater'


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const columns = [

    {
        id: 0,
        label: 'Placa',
        align: 'right',
    },
    {
        id: 1,
        label: 'ID Pago',
        align: 'right',
    },
    {
        id: 2,
        label: 'Fecha de pago',
        align: 'right',
        format: (value) => dayjs(value),

    },
    {
        id: 3,
        label: 'Valor pagado',
        align: 'right',
    },
];
function Income() {
    const [vehiculos, setVehiculos] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(0);

    const [numeroDeVentas, setnumeroDeVentas] = useState(0);
    const [total, setTotal] = useState(0);
    const [listaPagos, setListaPagos] = useState([]);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const { getSession } = useContext(AccountContext)

    const [fechaInicial, setfechaInicial] = React.useState(dayjs());
    const [fechaFinal, setfechaFinal] = React.useState(dayjs().add(23.9, 'hour'));


    const navigate = useNavigate()
    const handleChangeFechaInicial = (newValue) => {
        setfechaInicial(newValue);
    };

    const handleChangeFechaFinal = (newValue) => {
        setfechaFinal(newValue);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const loadData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('https://6ykfmxo06h.execute-api.us-east-1.amazonaws.com/income',
                {
                    params: {
                        fecha_inicio: fechaInicial.unix() * 1000,
                        fecha_final: fechaFinal.unix() * 1000
                    }
                })

            console.log(fechaInicial.unix())
            console.log(fechaFinal.unix())

            console.log(response.data)
            setListaPagos(response.data.result)
            setTotal(PriceFormater(response.data.valorIngresos))
            setnumeroDeVentas(response.data.numeroDeVentas)

        }

        catch (error) {
            console.log(error)

        }
        finally {
            setLoading(false)

        }
    }
    const handleSummit = (event) => {
        event.preventDefault();
        navigate('info-placa')

    }

    useEffect(() => {
        getSession()
            .then((session) => {
                console.log("Session", session)
            })
            .catch((session) => {
                console.log("Session", session)
                navigate('/login')
            })
    }, [])
    return (
        <div className="bgimg">


            <div className="white-background-card vertical-center text-center">
                <div className='income'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker className='dateInput'
                            label="Fecha Inicial"
                            inputFormat="MM/DD/YYYY"
                            value={fechaInicial}
                            onChange={handleChangeFechaInicial}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DesktopDatePicker className='dateInput'
                            label="Fecha Final"
                            inputFormat="MM/DD/YYYY"
                            value={fechaFinal}
                            onChange={handleChangeFechaFinal}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className='boton-contenedor'>
                    <Button className='boton' variant='contained' onClick={loadData}>Consultar</Button>

                </div>
                <div className='tabla'>
                <Typography>Total ganado: ${total} Numero de pagos: {numeroDeVentas}</Typography>

                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listaPagos
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row[1]}>
                                                    {
                                                        columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.id === 2
                                                                        ? dayjs(value).format('MM/DD/YYYY')
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })
                                                    }
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={listaPagos.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>

            </div>
            <footer>

            </footer>
        </div>
    );



}

export default Income;