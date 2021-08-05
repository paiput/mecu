// imports
import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
// components
import { HambMenu } from './HambMenu';

export const Header = () => {
  const [hambMenu, setHambMenu] = useState(false);

  const handelHambClick = (e) => {
    setHambMenu(prevValue => !prevValue);
  }

  return (
    <>
      <header className="header">
        <p>Mecu</p>
        <nav className="nav">
          <form className="search-bar">
            <button type="submit"><Icon.Search className="icon normal-icon" /></button>
            <input type="text" placeholder="Buscar productos..."></input>
          </form>
          <div className="tools-container">
            <div className="nav__hamburger" onClick={handelHambClick}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <button className="cart-button">
              <Icon.Cart className="icon big-icon" />
            </button>
          </div>
        </nav>
      </header>
      { hambMenu ? <HambMenu /> : '' }
    </>
  )
}