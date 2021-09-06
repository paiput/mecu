import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
// components
import { CartProduct } from './CartProduct';

export const CartContainer = () => {
  const { user } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);

  const handleEmptyCart = () => {
    setCart([]);
  }

  return (
    <div className="cart-container">
    {!user
      ? <p>Iniciá sesión para poder acceder al carrito</p>
      : cart.length > 0
        ? <>
          <div className="cart__products-container">
            {cart.map(product => {
              return <CartProduct product={product} key={product._id} />
            })}
          </div>
          <button onClick={handleEmptyCart} className="text-button primary-button">Vaciar carrito</button>
        </>
        : <p>El carrito está vacío</p>}
    </div>
  )
}