import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../contexts/UserContext';
import usersService from '../../services/users';
import handleService from '../../services/handlers';
// components
import { InputMsg } from './InputMsg';

export const Balance = () => {
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const filterNotNumbers = (e) => {
    if (e.which < 48 || e.which > 57) e.preventDefault();
  };

  const onSubmit = data => {
    const amountToLoad = data;

    console.log('Cantidad a cargar:', amountToLoad);

    usersService.updateUserBalance(user.username, amountToLoad)
      .then(updatedBalance => {
        console.log('Saldo aumentado exitosamente.\nSaldo actual:', updatedBalance);
        setUser(userData => {
          return {...userData, balance: updatedBalance };
        });
      })
      .catch(err => {
        alert('Lo sentimos, no se pudo cargar el dinero');
        console.log('Error on POST:', err);
      });

    reset();
  };

  return (
    <div className="balance-container">
      <h2>Tu saldo actual</h2>
      <h3>${user && handleService.numberWithCommas(user.balance)}</h3>
      <form className="balance-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="product-price__container form-container__input balance__amount-to-load">
          <span className="price-symbol">$</span>
          <input 
            type="number"
            id="input__amount-to-load"
            onKeyPress={filterNotNumbers}
            {...register('amountToLoad', { 
              required: true,
              min: 1, 
              max: 10000
            })}
          />
        </div>
        <button type="submit" className="text-button primary-button">Cargar saldo</button>
        {errors.amountToLoad?.type === 'max' && <InputMsg msg="La cantidad máxima de saldo que se puede cargar es de $10,000" />}
        {errors.amountToLoad?.type === 'min' && <InputMsg msg="No se puede cargar menos de $1" />}
      </form>
    </div>
  );
};