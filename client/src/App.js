// imports
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
  }
]

const App = () => {
  const [user, setUser] = useState(false);

  return (
    <div className="App">
      <Header />
      <FeaturedProduct />
      <LatestProducts />
    </div>
  );
}

export default App;
