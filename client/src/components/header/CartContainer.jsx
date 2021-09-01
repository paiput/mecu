import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
// components
import { CartProduct } from './CartProduct';

export const CartContainer = () => {
  const { cart, setCart } = useContext(CartContext);

  const handleEmptyCart = () => {
    setCart([]);
  }

  return (
    <div className="cart-container">
    {cart.length > 0
      ? <>
        <div className="cart__products-container">
          {cart.map(product => {
            return <CartProduct product={product} key={product._id} />
          })}
        </div>
        <button onClick={handleEmptyCart} className="primary-button">Vaciar carrito</button>
      </>
      : <p>El carrito está vacío</p>}
    </div>
  )
}