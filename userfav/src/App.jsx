import { useState, useEffect } from 'react';
import './App.css'
import { TarjetaUsuario } from './components/TarjetaUsuario.jsx'

function App() { 
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [contadorGlobal, setContadorGlobal] = useState(0);

  const usuariosFiltados = usuarios.filter((usuario) =>
    usuario.username.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleFavoritoClick = (idUsuario) => {
    const usuarioActual = usuarios.find(u => u.id === idUsuario);
    const eraFavorito = usuarioActual?.favorito;

    setContadorGlobal(prev => eraFavorito ? Math.max(0, prev - 1) : prev + 1);

    setUsuarios(usuarios.map(usuario => {
      if (usuario.id === idUsuario) {
        return {
          ...usuario,
          favorito: !usuario.favorito,
        };
      }
      return usuario;
    }));
  };

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
    .catch((err) => {
      setError(err.message);
      setCargando(false);
    });
  }, []);

  if (cargando) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error: {error}</p>
  
  return (
    <main>
      <h1>Prueba de Tarjeta de Usuario</h1>

      <input
        className='busqueda-usuario'
        type= "text"
        placeholder='Buscar por nombre...'
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}  
      />
      
      <p>Total de favoritos globales: {contadorGlobal}</p>
      
      <div className='lista-usuarios'>
        {usuariosFiltados.length > 0 ? (
          usuariosFiltados.map((usuario) => (
            <TarjetaUsuario key={usuario.id} user={usuario} onFavoritoClick={handleFavoritoClick}/>
          ))
        ) : (
          <p>No se encontraron usuarios con este nombre</p>
        )}
      </div>
      
    </main>
  )
}

export default App
