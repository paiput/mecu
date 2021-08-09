// imports
import { Link } from 'react-router-dom';
import handleService from '../services/handlers';
import * as Icon from 'react-bootstrap-icons';
// components
import { HambMenu } from './HambMenu';

export const Header = ({ hambMenu, setHambMenu }) => {

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
          <div className="tools-container">
            <div className={`nav__hamburger ${hambMenu ? 'change-to-cross' : ''}`} onClick={() => handleService.handleHambMenuClick(setHambMenu)} >
              <div className="nav__hamburger-child"></div>
              <div className="nav__hamburger-child"></div>
              <div className="nav__hamburger-child"></div>
            </div>
            <button className="cart-button">
              <Icon.Cart className="icon big-icon" />
            </button>
          </div>
        </nav>
      </header>
      { hambMenu && <HambMenu /> }
    </>
  )
}