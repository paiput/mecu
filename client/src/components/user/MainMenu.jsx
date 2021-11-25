// imports
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import productService from '../../services/products';
import loginService from '../../services/login';
// components
import { FeaturedProduct } from '../products/FeaturedProduct';
import { LatestProducts } from '../products/LatestProducts';

export const MainMenu = () => {
  const { user, setUser } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [randomProduct, setRandomProduct] = useState({});
  const [loading, setLoading] = useState(true);

  // se fija si el usuario sigue loggeado la primera vez que App renderiza
  useEffect(() => {
    loginService.getLoggedUser()
      .then(loggedUser => {
        setUser(loggedUser.data);
      })
      .catch(err => {
        console.log(err.response.data);
      });
  });

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

  document.title = "Mecu";
  
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
  )
}