import { Link } from 'react-router-dom';
// UserContext
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
// borrar despues
import userImg from './user.png';

export const Account = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div className="user-img__container">
        <img src={userImg} alt="perfil de usuario" />
      </div>
      <h2>{user.username}</h2>
      <h3>{user.name} {user.surname}</h3>
      <Link to="/account">Mis publicaciones</Link>
      {/* <Link>Balance</Link> */}
      <button>Cerrar sesión</button>
    </div>
  )
}