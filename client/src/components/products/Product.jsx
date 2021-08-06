// imports
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import handleService from '../../services/handlers';
// borrar despues
import emptyImg from './empty.jpg';

export const Product = ({ product }) => {
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

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
            <button className="product-button" onClick={() => handleService.handleClick(setLiked)}>
              {
                liked
                  ? <Icon.HeartFill className="icon big-icon heart" />
                  : <Icon.Heart className="icon big-icon heart" />
              }
            </button>
            <button className="product-button" onClick={() => handleService.handleClick(setAddedToCart)}>
              {
                addedToCart 
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