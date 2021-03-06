// imports
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import productService from '../../services/products';
// components
import { FeaturedProduct } from '../products/FeaturedProduct';
import { LatestProducts } from '../products/LatestProducts';

export const MainMenu = () => {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [randomProduct, setRandomProduct] = useState({});
  const [loading, setLoading] = useState(true);

  // renderiza los productos, y en cuanto se loguea un usuario filtra sus productos publicados
  useEffect(() => {
    productService.getAll()
      .then(fetchedProducts => {
        console.log('Products fetched');

        if (user) {
          console.log(user.username);
          const filteredProducts = fetchedProducts.filter(product => product.user.username !== user.username);
          setProducts(filteredProducts);
          setRandomProduct(filteredProducts[Math.floor(Math.random() * filteredProducts.length)]);
        } 
        else {
          setProducts(fetchedProducts);
          setRandomProduct(fetchedProducts[Math.floor(Math.random() * fetchedProducts.length)]);
        }

        setLoading(false);
      });
  // el useEffect se ejecuta cada vez que se loguee un usuario o cierre sesión
  // el comentario de abajo es para desactivar una advertencia del eslint
  }, [user?.username]); 

  document.title = 'Mecu';
  
  return (
    loading ? (
      'Cargando...'
    ) : products.length === 0 ? (
      <p>Aún no hay productos publicados, sé el primero.</p>
    ) : ( 
      <>
        <FeaturedProduct product={randomProduct} />
        <LatestProducts products={products} />
      </>
    )
  );
};