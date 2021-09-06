// imports
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../services/products';
import handleService from '../../services/handlers';
import userService from '../../services/users';
// components
import { LatestProduct } from './LatestProduct';
import * as Icon from 'react-bootstrap-icons';
// borrar despues
import emptyImg from './empty.jpg';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';

export const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    productService.getProduct(id)
    .then(productFetched => {
      setProduct(productFetched);
      setLoading(false);
      window.scrollTo(0, 0); // scrollea hacia arriba para que se vea el producto seleccionado
    });
  }, [id]);

  const handleCartClick = () => {
    if (user) {
      if (cart.includes(product)) {
        setCart(cartProducts => cartProducts.filter(cartProduct => cartProduct._id !== product._id)); 
      } 
      else {
        setCart(cartProducts => cartProducts.concat(product)); // le agrega el producto que esta recibiendo como prop
      } 
    } 
    else {
      alert('Iniciá sesión para guardar productos en el carrito');
    }
  }

  const handleLike = () => {
    if (user) {
      userService.handleProductLike(user.username, product)
        .then(updatedLikedProducts => {
          setUser(userData => {
            return {...userData, likedProducts: updatedLikedProducts} 
          })
        })
        .catch(err => {
          console.log('Error while liking product', err);
        })
    }
    else {
      alert('Iniciá sesión para guardar productos en favoritos');
    }
  }

  const renderProductDetails = () => {
    return (
      <>
        <div className="product-details">
            <h2 className="product-details__name">{product.name}</h2>
            <div className="product__img-container">
              <button className="product-button" onClick={handleLike}>
                {user?.likedProducts.includes(product._id)
                  ? <Icon.HeartFill className="icon big-icon heart"/>
                  : <Icon.Heart className="icon big-icon heart"/>}
              </button>
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
                <button className="product-details__button text-button primary-button">Comprar ahora</button>
                <button className="product-details__button text-button secondary-button" onClick={handleCartClick}>
                  {
                    cart.includes(product) 
                      ? "Quitar del carrito"
                      : "Agregar al carrito"
                  }
                </button>
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