import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import loginService from '../../services/login';
// UserContext
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
// components
import { InputMsg } from './InputMsg';
import { PasswordEye } from './PasswordEye';

export const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const onSubmit = data => {
    const { username, password } = data;

    loginService.login({ username, password })
      .then(async () => {
        const loggedUser = await loginService.getLoggedUser();
        setUser(loggedUser.data);
      });
      
    reset();
  };  

  const renderLogInForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="form-container login-form">
        <h2 className="form-title">Iniciar sesión</h2>
        <div className="form-container__input-container">
          <input 
            className="form-container__input"
            type="text"
            placeholder="Usuario"
            {...register('username', { 
              required: true
            })}
          />
          {errors.username?.type === 'required' && <InputMsg msg="Este campo es requerido" />}
        </div>
        <div className="form-container__input-container">
          <div className="password-input-container">
            <input 
              className="form-container__input"
              type={ isPasswordHidden ? 'password' : 'text' }
              placeholder="Contraseña"
              {...register('password', { 
                required: true
              })}
            />
            <PasswordEye isPasswordHidden={isPasswordHidden} setIsPasswordHidden={setIsPasswordHidden} />
          </div>
          {errors.password?.type === 'required' && <InputMsg msg="Este campo es requerido" />}
        </div>
        <button type="submit" className="text-button primary-button">Iniciar sesión</button>
        <Link to="/register" className="form-link">Aún no tengo cuenta</Link>
      </form>
    );
  };

  return user ? <Redirect to="/" /> : renderLogInForm();
};