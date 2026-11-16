import { useState, useEffect } from 'react';
import './App.css'
import { TarjetaUsuario } from './components/TarjetaUsuario.jsx'

function App() { 
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then ((respuesta) => {
      if(!respuesta.ok) {
        throw new Error('Error al cargar los usuarios');
      }
      return respuesta.json();
    })
    .then((datos) => {
      setUsuarios(datos);
      setCargando(false);
    })
    .then((err) => {
      setError(err.message);
      setCargando(false);
    });
  }, []);

  if (cargando) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>
  
  return (
    <main>
      <h1>Prueba de Tarjeta de Usuario</h1>
      <div className='lista-usuarios'>
        {usuarios.map((usuario) => (
          <TarjetaUsuario key={usuario.id} user={usuario} />
        ))}
      </div>
      
    </main>
  )
}

export default App
