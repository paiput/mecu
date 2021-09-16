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
import { Toaster } from 'react-hot-toast';
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
import { LikedProducts } from './components/user/LikedProducts';

const App = () => {
  const [user, setUser] = useState(null); // estado global del usuario
  const [cart, setCart] = useState([]); // estado global del carrito del usuario
  const [products, setProducts] = useState([]);
  const [randomProduct, setRandomProduct] = useState({});
  const [loading, setLoading] = useState(true);

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
        console.log('Error when getting logged user:', err);
      });
  }, []);

  // renderiza los productos, y en cuanto se loguea un usuario filtra sus productos publicados
  useEffect(() => {
    productService.getAll()
      .then(fetchedProducts => {
        console.log('Products fetched');

        if (user) {
          console.log(user.username)
          const filteredProducts = fetchedProducts.filter(product => product.user.username !== user.username);
          setProducts(filteredProducts);
          setRandomProduct(filteredProducts[Math.floor(Math.random() * filteredProducts.length)])
        } 
        else {
          setProducts(fetchedProducts);
          setRandomProduct(fetchedProducts[Math.floor(Math.random() * fetchedProducts.length)]);
        }

        setLoading(false);
      });
  // el useEffect se ejecuta cada vez que se loguee un usuario o cierre sesión
  // el comentario de abajo es para desactivar una advertencia del eslint
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.username]); 

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
            <Toaster />
            <button onClick={getUser}>mostar usuario</button>
            <Header hambMenuState={{hambMenu, setHambMenu}} cartState={{cartContainer, setCartContainer}} />
            <main>
              <Switch>
                <Route exact path="/">
                  {loading ? (
                    'Cargando...'
                  ) : products.length === 0 ? (
                    <p>Aún no hay productos publicados, sé el primero.</p>
                  ) : ( 
                    <>
                      <FeaturedProduct product={randomProduct} />
                      <LatestProducts products={products} />
                    </>
                  )}
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
                <Route path="/">
                  <h2>Not found</h2>
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
