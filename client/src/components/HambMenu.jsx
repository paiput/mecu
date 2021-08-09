import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

export const HambMenu = () => {
  return (
    <div className="hamb-menu">
      <Link to="/settings" className="hamb-menu__link"><Icon.Gear />Configuración</Link>
      <Link to="/account" className="hamb-menu__link"><Icon.Person />Cuenta</Link>
      <Link to="/sell" className="hamb-menu__link"><Icon.Tag />Vender</Link>
      <Link to="/account/balance" className="hamb-menu__link"><Icon.Wallet2 />Cargar saldo</Link>
    </div>
  )
}