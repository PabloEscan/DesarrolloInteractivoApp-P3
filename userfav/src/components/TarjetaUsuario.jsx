import './TarjetaUsuario.css';
import { useState} from 'react';

export const TarjetaUsuario = ({ user, onFavoritoClick }) => {

  const[mostrarDetalles, setMostrarDetalles] = useState(false);

  const toggleDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

  return (
    <div className="tarjeta-usuario">
      <button className={`btn-favorito ${user.favorito ? 'activo' : ''}`} onClick={() => onFavoritoClick(user.id)}>
        {user.favorito ? 'Favorito ⭐' : 'Favorito'}
      </button>

      <h3 className = "usuario-nombre">{user.name}</h3>
      <p className="usuario">@{user.username}</p>

      <div className="user-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Empresa:</strong> {user.company?.name}</p>
        <p><strong>Ciudad:</strong> {user.address?.city}</p>
      </div>

      <button className="btn-desplegar" onClick={toggleDetalles}>
        {mostrarDetalles ? 'Ocultar dirección completa' : 'Ver dirección completa'}
      </button>

      {mostrarDetalles && (
        <div className="direccion-desplegable">
          <p><strong>Calle (Street):</strong> {user.address?.street}</p>
          <p><strong>Apartamento/Suite (Suite):</strong> {user.address?.suite}</p>
        </div>
      )}
    </div>
  );
};