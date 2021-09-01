import { useForm } from 'react-hook-form';
import productService from '../../services/products';
// components
import { InputMsg } from './InputMsg';
// UserContext
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export const SellForm = () => {
  const { user: loggedUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const filterBadInputs = (e) => {
    let inputValue = e.currentTarget.value;
    if (inputValue.includes("  ")) {
      inputValue = inputValue.replace(/\s\s/g, " ");
    }
    if (inputValue.includes(" ")) {
      inputValue = inputValue.replace(/^\s/g, "");
    }
    if (inputValue.includes("\n")) {
      inputValue = inputValue.replace(/\n\n\n/g, "\n");
      inputValue = inputValue.replace(/^\n/g, "");
    }
  }

  // filtra caracteres que no sean numeros
  const filterNotNumbers = (e) => {
    if (e.which < 48 || e.which > 57) e.preventDefault();
  }

  const onSubmit = data => {
    const product = {...data, username: loggedUser.username}
    productService.postProduct(product)
      .then(product => {
        console.log('Product published:', product);
      })
      .catch(err => {
        alert('Lo sentimos, el producto no pudo ser publicado');
        console.log('Error on POST:', err);
      })
    reset();
  }

  return (
    <div className="sell-form-container">
      {/* handleSubmit valida los inputes antes de invocar a la funcion onSubmit */}
      <form className="sell-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="sell-form__input-container">
          <label htmlFor="name">Producto:</label>
          <input 
            type="text"
            id="input__product-name"
            onKeyPress={filterBadInputs}
            {...register("name", { 
              required: true, 
              minLength: 4, 
              maxLength: 35
            })}
          />
          {errors.name?.type === 'required' && <InputMsg msg="Este campo es requerido" />}
          {errors.name?.type === 'minLength' && <InputMsg msg="No supera el mínimo de caracteres requeridos" />}
          {errors.name?.type === 'maxLength' && <InputMsg msg="Supera el límite de caracteres" />}
        </div>
        <div className="sell-form__input-container">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="input__product-description"
            onKeyPress={filterBadInputs}
            {...register("description", { 
              required: true, 
              minLength: 35, 
              maxLength: 750 
            })}
          />
          {errors.description?.type === 'required' && <InputMsg msg="Este campo es requerido" />}
          {errors.description?.type === 'minLength' && <InputMsg msg="No supera el mínimo de caracteres requeridos" />}
          {errors.description?.type === 'maxLength' && <InputMsg msg="Supera el límite de caracteres" />}
        </div>
        <div className="sell-form__input-container">
          <label htmlFor="price">Precio:$</label>
          <input 
            type="number"
            id="input__product-price"
            onKeyPress={filterNotNumbers}
            {...register("price", { 
              required: true,
              min: 1, 
              max: 9999999
            })}
          />
          {errors.price?.type === 'required' && <InputMsg msg="Este campo es requerido" />}
          {errors.price?.type === 'min' && <InputMsg msg="No supera el precio mínimo" />}
          {errors.price?.type === 'max' && <InputMsg msg="Supera el precio máximo" />}
        </div>
        <div className="sell-form__input-container">
          <label htmlFor="quantity">Cantidad:</label>
          <input 
            type="number"
            id="input__product-quantity"
            onKeyPress={filterNotNumbers}
            {...register("quantity", { 
              required: true, 
              min: 1, 
              max: 10000 
            })}
          />
          {errors.quantity?.type === 'required' && <InputMsg msg="Este campo es requerido" />}
          {errors.quantity?.type === 'min' && <InputMsg msg="No se puede cargar menos de una unidad" />}
          {errors.quantity?.type === 'max' && <InputMsg msg="Supera la cantidad máxima de unidades que se pueden publicar" />}
        </div>
        <button className="primary-button" type="submit">Publicar</button>
      </form>
    </div>
  )
}