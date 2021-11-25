// imports
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../../services/products';
import handleService from '../../services/handlers';
import userService from '../../services/users';
// components
import { RelatedProducts } from './RelatedProducts';
import { BuyNow } from './BuyNow';
import toast from 'react-hot-toast';
import * as Icon from 'react-bootstrap-icons';
// borrar despues
import emptyImg from './empty.jpg';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';

export const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [buyNow, setBuyNow] = useState(false);
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    productService.getProduct(id)
    .then(fetchedProduct => {
      setProduct(fetchedProduct);
      setLoading(false);
      document.title = fetchedProduct.name
      window.scrollTo(0, 0); // scrollea hacia arriba para que se vea el producto seleccionado
      console.log('product publisher:', fetchedProduct.user)
    });
  }, [id, user?.balance]);

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
      toast('Iniciá sesión para guardar productos en el carrito', {
        icon: '🔑',
      });
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
      toast('Iniciá sesión para guardar productos en favoritos', {
        icon: '🔑',
      });
    }
  }

  const handleBuyNow = () => {
    if (user) setBuyNow(true);
    else if (!user) {
      toast('Iniciá sesión para comprar productos', {
        icon: '🔑',
      });
    }
  }

  const renderProductDetails = () => {
    return (
      <>
        <div className="product-details">
          <h2 className="product-details__name">{product.name}</h2>
          <div className="product__img-container">
            <button className="product-button product-details__like-button" onClick={handleLike}>
              {user?.likedProducts.some(likedProduct => likedProduct._id.toString() === product._id)
                ? <Icon.HeartFill className="icon big-icon heart"/>
                : <Icon.Heart className="icon big-icon heart"/>}
            </button>
            <img className="product__img" src={product.img || emptyImg} alt="..." />
          </div>
          <div className="product-details__text-container">
            <p className="product-details__description">{product.description}</p>
            <p className="product-details__price">${handleService.numberWithCommas(product.price)}</p>
            <p>Publicado por: {product.user.username}</p>
            {product.quantity > 1 ? (
              <p className="product-details__quantity">Quedan <strong>{product.quantity}</strong> unidades</p>
            ) : product.quantity === 1 ? (
              <p className="product-details__quantity"><strong style={{color: 'var(--red)'}}>Única unidad disponible</strong></p>
            ) : (
              <p>No quedan unidades disponibles</p>
            )}
          </div>
          <div className="product-details__buttons-container">
            {product.quantity >= 1 ? (
              <>
                <button className="product-details__button text-button primary-button" onClick={handleBuyNow}>
                  Comprar ahora
                </button>
                <button className="product-details__button text-button secondary-button" onClick={handleCartClick}>
                  {cart.includes(product) 
                    ? "Quitar del carrito"
                    : "Agregar al carrito"}
                </button>
              </>
            ) : (
              <button className="text-button" disabled="true">La publicación está pausada</button>
              )}
          </div>
        </div>
        <RelatedProducts product={product} />
        {buyNow && <BuyNow setBuyNow={setBuyNow} product={product} />}
      </>
    )
  }
  return (
    loading
      ? <p>Cargando producto...</p>
      : renderProductDetails()
  )
}