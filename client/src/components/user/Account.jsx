import { Link } from 'react-router-dom';
import handleService from '../../services/handlers';
// UserContext
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
// borrar despues
import userImg from './user.png';

export const Account = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="user-container">
      <div className="user-container__child user__profile">
        <div className="user__img-container">
          <img src={userImg} alt="perfil de usuario" className="user__img" />
        </div>
        <h2>{user.username}</h2>
        <h3>{user.name} {user.surname}</h3>
      </div>
      <div className="user-container__child user__balance-container">
        <h3>Billetera: </h3>
        <h2>${handleService.numberWithCommas(user.balance)}</h2>
        <Link to="/account/balance" className="user__link">Cargar dinero</Link>
      </div>
      <div className="user-container__child">
        <Link to="favorites" className="user__link">Favoritos</Link>
      </div>
      <div className="user-container__child user__links">
        <Link to="/account/publishedproducts" className="user__link">Mis publicaciones</Link>
        <Link to="/account/purchasedproducts" className="user__link">Historial de compra</Link>
        <Link to="/account/productssold" className="user__link">Historial de venta</Link>
      </div>
      <div className="user-container__child danger-buttons-container">
        <button className="text-button secondary-danger-button">Cerrar sesión</button>
        <button className="text-button primary-danger-button">Borrar cuenta</button>
      </div>
    </div>
  )
}