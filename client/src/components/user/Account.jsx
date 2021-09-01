import { Link } from 'react-router-dom';
import handleService from '../../services/handlers';
// UserContext
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
// borrar despues
import userImg from './user.png';

export const Account = () => {
  const { user } = useContext(UserContext);
  console.log('este sos vos', user)
  return (
    <div className="user-container">
      <div className="user__profile">
        <div className="user__img-container">
          <img src={userImg} alt="perfil de usuario" className="user__img" />
        </div>
        <h2>{user.username}</h2>
        <h3>{user.name} {user.surname}</h3>
      </div>
      <h3>Billetera: ${handleService.numberWithCommas(user.balance)}</h3>
      <Link to="/account/balance" className="user__link">Cargar dinero</Link>
      <Link to="/account/publishedproducts" className="user__link">Mis publicaciones</Link>
      <Link to="/account/purchasedproducts" className="user__link">Historial de compra</Link>
      <Link to="/account/productssold" className="user__link">Historial de venta</Link>
      <button style={{display: 'block', margin: '2rem 0', padding: '.5rem 1rem'}}>Cerrar sesión</button>
    </div>
  )
}