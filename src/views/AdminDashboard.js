import '../styles/PlacaAdd.css'
import '../styles/Logo.css'
import { Search } from "@mui/icons-material";
import { IconButton } from '@mui/material';
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

const columns = [

  {
    id: 'Placa',
    label: 'Placa',
    align: 'right',
  },
  {
    id: 'Fechahoraentrada',
    label: 'Fecha y hora de entrada',
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Tipodevehiculo',
    label: 'Tipo de vehiculo',
    align: 'right',
  },
  {
    id: 'TiempoCobrado',
    label: 'Horas hasta ahora',
    align: 'right',
  },
];
function AdminDashboard() {
  const [vehiculos, setVehiculos] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { getSession } = useContext(AccountContext)

  const navigate = useNavigate()
  const handleChange = event => {

  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const loadData = async () => {
    let token
    getSession()
      .then((session) => {
        token = session.idToken.jwtToken
      })
    setLoading(true)
    try {

      const response = await axios.get('https://ct03bauc60.execute-api.us-east-1.amazonaws.com/Prod/vehicles', {
        headers: {
          'Authorization': token
        }
      })
      response.data.forEach(element => {
        const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let horaEntrada = new Date(parseInt(element.Fechahoraentrada)).toLocaleString("es-CO", options)
        let tiempoCobrado = Math.ceil((Date.now() - element.Fechahoraentrada) / 3600000)
        console.log(horaEntrada)
        element.Fechahoraentrada = horaEntrada
        element.TiempoCobrado = tiempoCobrado
      });
      setVehiculos(response.data)
      console.log(vehiculos)
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
        console.log("Session 12312", session.idToken.jwtToken)
      })
      .catch((session) => {
        console.log("Session", session)
        navigate('/login')
      })
    loadData()
  }, [])
  return (
    <div className="bgimg">


      <div className="white-background-card vertical-center text-center">
        {loading ?
          <Loading /> : <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                  {vehiculos
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.Placa}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={vehiculos.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>}
      </div>
      <footer>

      </footer>
    </div>
  );



}

export default AdminDashboard;