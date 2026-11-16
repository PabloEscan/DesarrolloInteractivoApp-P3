import './TarjetaUsuario.css';

export const TarjetaUsuario = ({ user }) => {
  return (
    <div className="tarjeta-usuario">
      <button className = "btn-favorito">Favorito</button>

      <h3 callsName = "usuario-nombre">{user.name}</h3>
      <p className="usuario">@{user.username}</p>
      <div className="user-details">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Empresa:</strong> {user.company?.name}</p>
        <p><strong>Ciudad:</strong> {user.address?.city}</p>
      </div>
    </div>
  );
};