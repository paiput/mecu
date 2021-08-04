import * as Icon from 'react-bootstrap-icons';

export const Header = () => {
  return (
    <header className="header">
      <p>Mecu</p>
      <nav className="nav">
        <form className="search-bar">
          <button type="submit"><Icon.Search className="icon normal-icon" /></button>
          <input type="text" placeholder="Buscar productos..."></input>
        </form>
        <div className="tools-container">
          <div className="nav__hamburger">
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
  )
}