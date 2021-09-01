// imports
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
// borrar despues
import emptyImg from './empty.jpg';
import { CartContext } from '../../contexts/CartContext';

export const Product = ({ product }) => {
  const [liked, setLiked] = useState(false); // crear funcionalidad para los likes
  const { cart, setCart } = useContext(CartContext);

  const handleCartClick = () => {
    if (cart.includes(product)) {
      setCart(cartProducts => cartProducts.filter(cartProduct => cartProduct._id !== product._id)); 
    } 
    else {
      setCart(cartProducts => cartProducts.concat(product)); // le agrega el producto que esta recibiendo como prop
    } 
  }

  return (
    <>
      <div className="product__img-container">
        <Link to={`/products/${product._id}`}>
          <img className="product__img" src={emptyImg} alt="..." />
        </Link>
      </div>
      <div className="product-info">
        <p className="product__name">{product.name}</p>
        <p className="product__price">${product.price}</p>
        <div className="product__buttons-container">
          <button className="primary-button">Comprar ahora</button>
          <div className="icon-button-container">
            <button className="product-button" >
              {
                liked
                  ? <Icon.HeartFill className="icon big-icon heart" />
                  : <Icon.Heart className="icon big-icon heart" />
              }
            </button>
            <button className="product-button" onClick={handleCartClick}>
              {
                cart.includes(product) 
                  ? <Icon.CartCheckFill className="icon big-icon" />
                  : <Icon.CartPlus className="icon big-icon" />
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}