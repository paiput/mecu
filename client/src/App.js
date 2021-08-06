// imports
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import productService from './services/products';
// components
import { Header } from './components/Header';
import { FeaturedProduct } from './components/products/FeaturedProduct';
import { LatestProducts } from './components/products/LatestProducts';
import { ProductDetails } from './components/products/ProductDetails';
import { SellForm } from './components/user/SellForm';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const randomProduct = products[Math.floor(Math.random() * products.length)];

  useEffect(() => {
    productService.getAll()
      .then(fetchedProducts => {
        console.log('Products fetched');
        setProducts(fetchedProducts);
        setLoading(false);
      })
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
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
