
export default function NotFound({ text, color }) {
    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}
            className='noExiste'>
            <h1>El vehiculo ingresado no se encuentra en el parqueadero</h1>

        </div>
    );
}
