// imports
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import handleService from '../../services/handlers';
import * as Icon from 'react-bootstrap-icons';
// components
import { HambMenu } from './HambMenu';
import { CartContainer } from './CartContainer';
// CartContext
import { CartContext } from '../../contexts/CartContext';

export const Header = ({ hambMenuState, cartState }) => {
  const { hambMenu, setHambMenu } = hambMenuState;
  const { cartContainer, setCartContainer } = cartState;
  const { cart } = useContext(CartContext);

  const handleShowHambMenu = () => {
    handleService.handleClick(setHambMenu);
  };

  const handleShowCart = () => {
    handleService.handleClick(setCartContainer);
  };

  return (
    <>
      <header className="header">
        <p className="header__logo">
          <Link to="/">
            <Icon.House className="icon big-icon"/>
          </Link>
        </p>
        <nav className="nav">
          <form className="search-bar">
            <button type="submit"><Icon.Search className="icon normal-icon" /></button>
            <input type="text" placeholder="Buscar productos..."></input>
          </form>
          { window.innerWidth >= 769 && <HambMenu hambMenu={hambMenu} />}
          <div className="tools-container">
            {window.innerWidth <= 769 && <div className={`nav__hamburger ${hambMenu ? 'change-to-cross' : ''}`} onClick={(handleShowHambMenu)} >
              <div className="nav__hamburger-child"></div>
              <div className="nav__hamburger-child"></div>
              <div className="nav__hamburger-child"></div>
            </div>}
            <button className="cart-button" onClick={handleShowCart}>
              <Icon.Cart className="icon big-icon" />
              {cart.length === 0
                ? ''
                : <span className="cart-button__products-counter">{cart.length > 9 ? '9+' : cart.length}</span>
              }
            </button>
          </div>
        </nav>
      </header>
      { cartContainer && <CartContainer />}
      { window.innerWidth <= 768 && <HambMenu hambMenu={hambMenu} />}
    </>
  );
};