import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router';
import loginService from '../../services/login';
// UserContext
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

export const LoginForm = () => {
  const { user, setUser } = useContext(UserContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = data => {
    const { username, password } = data;

    loginService.login({ username, password })
      .then(async res => {
        console.log(res.data); // loguea si el usuario se pudo autenticar correctamente
        const loggedUser = await loginService.getLoggedUser();
        setUser(loggedUser.data);
      })
      .catch(err => {
        console.log('Error when loggin in:', err);
      });
      
    reset();
  }  

  const renderLogInForm = () => {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="login-form__input-container">
          <input 
            type="text"
            placeholder="Usuario"
            {...register("username", { 
              required: true
            })}
          />
          {errors.username?.type === 'required' && <small>Este campo es requerido</small>}
        </div>
        <div className="login-form__input-container">
          <input 
            type="text"
            placeholder="Contraseña"
            {...register("password", { 
              required: true
            })}
          />
          {errors.password?.type === 'required' && <small>Este campo es requerido</small>}
        </div>
        <button type="submit" className="primary-button">Iniciar sesión</button>
      </form>
    )
  }

  return user ? <Redirect to="/" /> : renderLogInForm();
}