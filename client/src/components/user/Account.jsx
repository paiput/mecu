import { useContext } from 'react';
import { Link } from 'react-router-dom';
import handleService from '../../services/handlers';
import loginService from '../../services/login';
import registerService from '../../services/register';
// UserContext
import { UserContext } from '../../contexts/UserContext';
// components
import toast from 'react-hot-toast';
import { useHistory } from 'react-router';
// borrar despues
import userImg from './user.png';

export const Account = () => {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const handleLogout = () => {
    loginService.logout()
      .then(res => {
        toast(`Hasta pronto, ${user.name}`, { icon: '👋' });
        setUser(null);
      });
    history.replace('/');
  }

  const handleDeleteAccount = () => {
    registerService.deleteAccount(user)
      .then(res => {
        toast(`Cuenta borrada exitosamente`, { icon: '👌' });
        history.replace('/');
        setUser(null);
      });
  }

  if (!user) return 'Cargando...'; // hacer esqueleto

  return (
    <div className="user-container">
      <div className="user-container__child user__profile">
        <div className="user__img-container">
          <img 
            src={user && `https://avatars.dicebear.com/api/initials/${user.name}-${user.surname}.svg`}
            onError={(e) => {e.target.onerror = null; e.target.src=`${userImg}`}}
            alt="perfil de usuario" 
            className="user__img" 
          />
        </div>
        <h2>{user && user.username}</h2>
        <h3>{user && user.name} {user && user.surname}</h3>
      </div>
      <div className="user-container__child user__balance-container">
        <h3>Billetera: </h3>
        <h2>${user && handleService.numberWithCommas(user.balance)}</h2>
        <Link to="/account/balance" className="user__link">Cargar dinero</Link>
      </div>
      <div className="user-container__child">
        <Link to="/account/favorites" className="user__link">Favoritos</Link>
      </div>
      <div className="user-container__child user__links">
        <Link to="/account/publishedproducts" className="user__link">Mis publicaciones</Link>
        <Link to="/account/purchasedproducts" className="user__link">Historial de compra</Link>
        <Link to="/account/soldproducts" className="user__link">Historial de venta</Link>
      </div>
      <div className="user-container__child danger-buttons-container">
        <button className="text-button secondary-danger-button" onClick={handleLogout}>Cerrar sesión</button>
        <button className="text-button primary-danger-button" onClick={handleDeleteAccount}>Borrar cuenta</button>
      </div>
    </div>
  )
}