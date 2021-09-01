// imports
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../services/products';
import handleService from '../../services/handlers';
// components
import { LatestProduct } from './LatestProduct';
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
      window.scrollTo(0, 0); // scrollea hacia arriba para que se vea el producto seleccionado
    });
  }, [id]);

  const renderProductDetails = () => {
    return (
      <>
        <div className="product-details">
            <h2 className="product-details__name">{product.name}</h2>
            <div className="product__img-container">
              <img className="product__img" src={emptyImg} alt="..." />
            </div>
            <div className="product-details__text-container">
              <p className="product-details__description">{product.description}</p>
              <p className="product-details__price">${handleService.numberWithCommas(product.price)}</p>
              <p>Publicado por: {product.user.username}</p>
              {
                product.quantity > 1
                  ? <p className="product-details__quantity">Quedan <strong>{product.quantity}</strong> unidades</p>
                  : <p className="product-details__quantity"><strong style={{color: 'var(--red)'}}>Única unidad disponible</strong></p>
              }
              <div className="product-details__buttons-container">
                <button className="product-details__button primary-button">Comprar ahora</button>
                <button className="product-details__button secondary-button">Agregar al Carrito</button>
              </div>
            </div>
        </div>

        {
          product.user.products.length > 0
          ? <>
            <hr />
            <h3>Otros productos publicados por {product.user.username}</h3>
            {product.user.products.map(product => {
                return <LatestProduct product={product} key={product._id} />
              })}
          </>
            : ''
        }
      </>
    )
  }
  return (
    loading
      ? <p>Cargando producto...</p>
      : renderProductDetails()
  )
}