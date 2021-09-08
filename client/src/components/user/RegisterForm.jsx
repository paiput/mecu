import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import registerService from '../../services/register';
// UserContext
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
// components
import { InputMsg } from './InputMsg';
import { PasswordEye } from './PasswordEye';

export const RegisterForm = () => {
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const onSubmit = data => {
    const { username, name, surname, password } = data;
    const userToRegister = { username, name, surname, password };
    
    registerService.register(userToRegister)
      .then(createdUser => {
        setUser(createdUser.data);
      })
      .catch(err => {
        console.log('Error while registering new user:', err);
      });
      
    reset();
  }  
  
  const renderRegisterForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <h2 className="form-title">Registrarse</h2>
        <div className="form-container__input-container">
          <input 
            className="form-container__input"
            type="text"
            placeholder="Nombre"
            {...register("name", { 
              required: true
            })}
          />
          {errors.username?.type === 'required' && <InputMsg msg="Este campo es requerido" />}
        </div>
        <div className="form-container__input-container">
          <input 
            className="form-container__input"
            type="text"
            placeholder="Apellido"
            {...register("surname", { 
              required: true
            })}
          />
          {errors.username?.type === 'required' && <InputMsg msg="Este campo es requerido" />}
        </div>
        <div className="form-container__input-container">
          <input 
            className="form-container__input"
            type="text"
            placeholder="Usuario"
            {...register("username", { 
              required: true
            })}
          />
          {errors.username?.type === 'required' && <InputMsg msg="Este campo es requerido" />}
        </div>
        <div className="form-container__input-container">
          <div className="password-input-container">
            <input 
              className="form-container__input"
              type={ isPasswordHidden ? "password" : "text" }
              placeholder="Contraseña"
              {...register("password", { 
                required: true
              })}
            />
            <PasswordEye isPasswordHidden={isPasswordHidden} setIsPasswordHidden={setIsPasswordHidden} />
          </div>
          {errors.password?.type === 'required' && <InputMsg msg="Este campo es requerido" />}
        </div>
        <button type="submit" className="text-button primary-button">Registrarse</button>
        <Link to="/login" className="form-link">Ya tengo cuenta</Link>
      </form>
    )
  }

  return user ? <Redirect to="/" /> : renderRegisterForm();
}