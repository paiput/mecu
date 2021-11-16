// imports
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Icon from 'react-bootstrap-icons';
import handleService from '../../services/handlers';
import userService from '../../services/users';
// borrar despues
import emptyImg from './empty.jpg';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';

export const Product = ({ product }) => {
  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

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

  return (
    <>
      <div className="product__img-container">
        <Link to={`/products/${product._id}`}>
          <img className="product__img" src={product.img || emptyImg} alt="..." />
        </Link>
      </div>
      <div className="product-info">
        <p className="product__name">{product.name}</p>
        <p className="product__price">${handleService.numberWithCommas(product.price)}</p>
        <div className="product__buttons-container">
          <Link to={`/products/${product._id}`} className="text-button primary-button product-link">Ver</Link>
          <div className="icon-button-container">
            <button className="product-button" onClick={handleLike}>
              {
                user?.likedProducts.some(likedProduct => likedProduct._id === product._id)
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