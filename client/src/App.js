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
// components
import { Header } from './components/Header';
import { FeaturedProduct } from './components/products/FeaturedProduct';
import { LatestProducts } from './components/products/LatestProducts';
import { ProductDetails } from './components/products/ProductDetails';
import { SellForm } from './components/user/SellForm';

const App = () => {
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
      })
  }, []);

  return (
    <Router>
      <div className="App" onClick={(e) => handleService.handleClickOutsideHambMenu(e, setHambMenu)}>
        <Header hambMenu={hambMenu} setHambMenu={setHambMenu} />
        <Switch>
          <Route exact path="/">
            {
              loading
                ? 'Cargando...'
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
          <Route path="/">
            <h2>Not found</h2>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
