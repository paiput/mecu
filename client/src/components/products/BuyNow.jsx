import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../contexts/UserContext';
import hanldeService from '../../services/handlers';
import userService from '../../services/users';
// components
import { InputMsg } from '../user/InputMsg';
import * as Icon from 'react-bootstrap-icons';

export const BuyNow = ({ setBuyNow, product }) => {
  const { user: loggedUser, setUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleClickOutside = (e) => {
    // console.log('click')
    if (!e.target.classList.contains('buy-now-container') && !e.target.parentElement.classList.contains('buy-now-container') && !e.target.parentElement.parentElement.classList.contains('buy-now-container')) {
      setBuyNow(false);
    }
  }
  
  useEffect(() => {
    // Vincula el detector de clicks
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      // Desvincula el detector de clicks
      document.removeEventListener('click', handleClickOutside, true);
    }
  });

  // filtra caracteres que no sean numeros
  const filterNotNumbers = (e) => {
    if (e.which < 48 || e.which > 57) e.preventDefault();
  }

  const onSubmit = data => {
    const { amountToBuy } = data;
    // handleProductPurchase devuelve un objeto de promesas que son los valores actualizados del producto y el usuario que lo compro
    const { updatedUser, updatedProduct } = userService.handleProductPurchase(loggedUser, product, amountToBuy);

    updatedUser
      .then(updatedUserBalance => {
        console.log('Balance del usuario comprador:', updatedUserBalance);
        setUser(userData => {
          return {...userData, balance: updatedUserBalance}
        })
      })
      .catch(err => {
        alert('error con el usuario');
      })

    updatedProduct
      .then(updatedProduct => {
        console.log('Producto comprado:', updatedProduct);
      })
      .catch(err => {
        alert('error con el producto');
      });

    reset();
    setBuyNow(false);
  }

  return (
    <form className="buy-now-container" onSubmit={handleSubmit(onSubmit)}>
      <button className="product-button" onClick={() => setBuyNow(false)}>
        <Icon.XCircle className="icon big-icon"/>
      </button>
      <h2>{product.name}</h2>
      <h3>${hanldeService.numberWithCommas(product.price)}</h3>
      <h3>{product.quantity} unidades restantes</h3>
      <h3>Por: {product.user.username}</h3>
      <div>
        <h3>Cantidad a comprar</h3>
        <input 
          type="number"
          id="input__product-amount-to-buy"
          onKeyPress={filterNotNumbers}
          defaultValue={1}
          {...register("amountToBuy", { 
            min: 1, 
            max: product.quantity
          })}
        />
        {errors.amountToBuy?.type === 'min' && <InputMsg msg="Se debe comprar al menos un producto" />}
        {errors.amountToBuy?.type === 'max' && <InputMsg msg="Supera la cantidad de unidades disponibles" />}
      </div>
      <button type="submit" className="text-button primary-button">
        Finalizar compra
      </button>
    </form>
  )
}