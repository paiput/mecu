// imports
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import handleService from './services/handlers';
import loginService from './services/login';
import { UserContext } from './contexts/UserContext'; // contexto del usuario
import { CartContext } from './contexts/CartContext'; // contexto del carrito del usuario
// components
import { Toaster } from 'react-hot-toast';
import { Header } from './components/header/Header';
import { MainMenu } from './components/user/MainMenu';
import { ProductDetails } from './components/products/ProductDetails';
import { SellForm } from './components/user/SellForm';
import { RegisterForm } from './components/user/RegisterForm';
import { LoginForm } from './components/user/LoginForm';
import { Account } from './components/user/Account';
import { PublishedProducts } from './components/user/PublishedProducts';
import { Balance } from './components/user/Balance';
import { LikedProducts } from './components/user/LikedProducts';
import { PurchasedProducts } from './components/user/PurchasedProducts';

const App = () => {
  const [user, setUser] = useState(null); // estado global del usuario
  const [cart, setCart] = useState([]); // estado global del carrito del usuario

  // estados para detectar clicks fuera de los menúes desplegables
  const [hambMenu, setHambMenu] = useState(false);
  const [cartContainer, setCartContainer] = useState(false);

  // se fija si el usuario sigue loggeado la primera vez que App renderiza
  useEffect(() => {
    loginService.getLoggedUser()
      .then(loggedUser => {
        setUser(loggedUser.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }, []);

  const handleClickOutsideMenus = (e) => {
    handleService.handleClickOutsideHambMenu(e, setHambMenu)
    handleService.handleClickOutsideCartContainer(e, setCartContainer)
  }

  return (
    <Router>
      <div className="App" onClick={(e) => handleClickOutsideMenus(e)}>
        <UserContext.Provider value={{ user, setUser }} >
          <CartContext.Provider value={{ cart, setCart }} >
            <Toaster />
            <Header hambMenuState={{hambMenu, setHambMenu}} cartState={{cartContainer, setCartContainer}} />
            <main>
              <Switch>
                <Route exact path="/">
                  <MainMenu />
                </Route>
                <Route path="/products/:id">
                  <ProductDetails />
                </Route>
                <Route path="/sell">
                  <SellForm />
                </Route>
                <Route path="/register">
                  <RegisterForm />
                </Route>
                <Route path="/login">
                  <LoginForm />
                </Route>
                <Route exact path="/account">
                  <Account />
                </Route>
                <Route path="/account/balance">
                  <Balance />
                </Route>
                <Route path="/account/favorites">
                  <LikedProducts />
                </Route>
                <Route path="/account/publishedproducts">
                  <PublishedProducts />
                </Route>
                <Route path="/account/purchasedproducts">
                  <PurchasedProducts />
                </Route>
                <Route path="/">
                  <div>
                    <p>Esta no parece ser la página que estás buscando</p>
                    <img src="https://static.tumblr.com/58d9c77e9619492c680de2a9772bcb51/txjgy5i/2HNoujzqj/tumblr_static_tumblr_static__640.gif" alt="gif" />
                  </div>
                </Route>
              </Switch>
            </main>
          </CartContext.Provider>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
