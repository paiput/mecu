import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../services/products';
// borrar despues
import emptyImg from './empty.jpg';

export const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    productService.getProduct(id)
    .then(productFetched => {
      setProduct(productFetched);
      setLoading(false);
    });
  }, [id]);

  return (
    loading
      ? <p>Cargando producto...</p>
      : <div className="product-details">
          <h2 className="product-details__name">{product.name}</h2>
          <div className="product__img-container">
            <img className="product__img" src={emptyImg} alt="..." />
          </div>
          <div className="product-details__text-container">
            <p className="product-details__description">{product.description}</p>
            <p className="product-details__price">${product.price}</p>
            {
              product.quantity > 1
                ? <p className="product-details__quantity">Quedan <strong>{product.quantity}</strong> unidades</p>
                : <p className="product-details__quantity">Queda <strong style={{color: 'var(--red)'}}>{product.quantity}</strong> unidad</p>
            }
            <div className="product-details__buttons-container">
              <button className="product-details__button primary-button">Comprar ahora</button>
              <button className="product-details__button secondary-button">Agregar al Carrito</button>
            </div>
          </div>
      </div>
  )
}