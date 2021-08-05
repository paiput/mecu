import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

export const HambMenu = () => {
  return (
    <div className="hamb-menu">
      <Link to="/settings">Configuración</Link>
      <Link to="/account">Cuenta</Link>
      <Link to="/sell">Vender</Link>
      <Link to="/account/balance">Cargar saldo</Link>
    </div>
  )
}