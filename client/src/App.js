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
import { UserContext } from './contexts/UserContext'; // estado global del usuario
// components
import { Header } from './components/Header';
import { FeaturedProduct } from './components/products/FeaturedProduct';
import { LatestProducts } from './components/products/LatestProducts';
import { ProductDetails } from './components/products/ProductDetails';
import { SellForm } from './components/user/SellForm';
import { RegisterForm } from './components/user/RegisterForm';
import { LoginForm } from './components/user/LoginForm';

const App = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [randomProduct, setRandomProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [hambMenu, setHambMenu] = useState(false);

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

  return (
    <Router>
      <div className="App" onClick={(e) => handleService.handleClickOutsideHambMenu(e, setHambMenu)}>
        <UserContext.Provider value={{ user, setUser }} >
          <button onClick={getUser}>mostar usuario</button>
          <Header hambMenu={hambMenu} setHambMenu={setHambMenu} />
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
            <Route path="/">
              <h2>Not found</h2>
            </Route>
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
