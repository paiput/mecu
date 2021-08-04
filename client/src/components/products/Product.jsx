// imports
import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import productService from '../../services/product';
// borrar despues
import emptyImg from './empty.jpg';

export const Product = () => {
  const [liked, setLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  return (
    <>
      <div className="product__img-container">
        <img className="product__img" src={emptyImg} alt="..." />
      </div>
      <div className="product-info">
        <p className="product__name">Nombre del producto</p>
        <p className="product__price">$2,499</p>
        <div className="product__buttons-container">
          <button className="primary-button">Comprar ahora</button>
          <div className="icon-button-container">
            <button className="product-button" onClick={() => productService.handleChange(setLiked)}>
              {
                liked
                  ? <Icon.HeartFill className="icon big-icon heart" />
                  : <Icon.Heart className="icon big-icon heart" />
              }
            </button>
            <button className="product-button" onClick={() => productService.handleChange(setAddedToCart)}>
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