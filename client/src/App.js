// imports
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import productService from './services/products';
import handleService from './services/handlers';
import loginService from './services/login';
import { UserContext } from './contexts/UserContext'; // contexto del usuario
import { CartContext } from './contexts/CartContext'; // contexto del carrito del usuario
// components
import { Header } from './components/header/Header';
import { FeaturedProduct } from './components/products/FeaturedProduct';
import { LatestProducts } from './components/products/LatestProducts';
import { ProductDetails } from './components/products/ProductDetails';
import { SellForm } from './components/user/SellForm';
import { RegisterForm } from './components/user/RegisterForm';
import { LoginForm } from './components/user/LoginForm';
import { Account } from './components/user/Account';
import { PublishedProducts } from './components/user/PublishedProducts';
import { Balance } from './components/user/Balance';

const App = () => {
  const [user, setUser] = useState(null); // estado global del usuario
  const [cart, setCart] = useState([]); // estado global del carrito del usuario
  const [products, setProducts] = useState([]);
  const [randomProduct, setRandomProduct] = useState({});
  const [loading, setLoading] = useState(true);

  // estados para detectar clicks fuera de los menúes desplegables
  const [hambMenu, setHambMenu] = useState(false);
  const [cartContainer, setCartContainer] = useState(false);

  useEffect(() => {
    productService.getAll()
      .then(fetchedProducts => {
        console.log('Products fetched');
        setProducts(fetchedProducts);
        setRandomProduct(fetchedProducts[Math.floor(Math.random() * fetchedProducts.length)]);
        setLoading(false);
      });

    loginService.getLoggedUser()
      .then(loggedUser => {
        setUser(loggedUser.data);
      })
      .catch(err => {
        console.log('Error when getting logged user:', err);
      });
  }, []);

  const getUser = () => {
    console.log('usuario:', user);
  }

  const handleClickOutsideMenus = (e) => {
    handleService.handleClickOutsideHambMenu(e, setHambMenu)
    handleService.handleClickOutsideCartContainer(e, setCartContainer)
  }

  return (
    <Router>
      <div className="App" onClick={(e) => handleClickOutsideMenus(e)}>
        <UserContext.Provider value={{ user, setUser }} >
          <CartContext.Provider value={{ cart, setCart }} >
            <button onClick={getUser}>mostar usuario</button>
            <Header hambMenuState={{hambMenu, setHambMenu}} cartState={{cartContainer, setCartContainer}} />
            <Switch>
              <Route exact path="/">
                {
                  loading
                    ? 'Cargando...'
                    : products.length === 0
                    ? <p>Aún no hay productos publicados, sé el primero.</p>
                    : <>
                          <FeaturedProduct product={randomProduct} />
                          <LatestProducts products={products} />
                      </>
                }
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
              <Route path="/account/publishedproducts">
                <PublishedProducts />
              </Route>
              <Route path="/">
                <h2>Not found</h2>
              </Route>
            </Switch>
          </CartContext.Provider>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
