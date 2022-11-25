import '../styles/PlacaAdd.css'



function PlacaAdd() {
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
                    <input className="placa-add-form-input" type='text' placeholder="" size='10' name='placa' />
                    <button className="placa-add-form-btn">Consultar placa</button>
                </form>
            </div>
            <footer>

            </footer>
        </div>
    );



}

export default PlacaAdd;