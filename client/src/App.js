// imports
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useState } from 'react';
import './App.css';
// components
import { Header } from './components/Header';
import { FeaturedProduct } from './components/products/FeaturedProduct';
import { LatestProducts } from './components/products/LatestProducts';

const products = [
  {
    id: 1,
    name: 'Remera',
    description: 'Remera para entrenamiento de tela ultrafina',
    img: null,
    price: 2499,
    quantity: 10
  },
  {
    id: 2,
    name: 'Pantalon',
    description: 'Pantalon de jean',
    img: null,
    price: 1999,
    quantity: 5
  },
  {
    id: 3,
    name: 'Gorra',
    description: 'Gorra de beisbol',
    img: null,
    price: 800,
    quantity: 11
  },
  {
    id: 4,
    name: 'Camiseta NBA',
    description: 'Camiseta NBA de los Chicago Bulls',
    img: null,
    price: 9000,
    quantity: 3
  }
]

const randomProduct = products[Math.floor(Math.random() * products.length)];

const App = () => {
  const [user, setUser] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <FeaturedProduct product={randomProduct} />
            <LatestProducts products={products} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
