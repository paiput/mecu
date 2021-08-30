// imports
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
// UserContext
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export const HambMenu = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="hamb-menu">
    {
      user
        ? <>      
          <Link to="/account" className="hamb-menu__link"><Icon.Person />Cuenta</Link>
          <Link to="/favorites" className="hamb-menu__link"><Icon.Heart />Favoritos</Link>
          <Link to="/sell" className="hamb-menu__link"><Icon.Tag />Vender</Link>
          <Link to="/account/balance" className="hamb-menu__link"><Icon.Wallet2 />Cargar saldo</Link>
        </>
        : <>
          <Link to="/login" className="hamb-menu__link"><Icon.Key style={{ transform: "rotate(45deg)" }} />Iniciar sesión</Link>
          <Link to="/register" className="hamb-menu__link"><Icon.PersonPlus />Registrarse</Link>
        </>
    }

    </div>    
  )
}