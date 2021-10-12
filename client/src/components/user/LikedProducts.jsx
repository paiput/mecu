import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
// components
import { Product } from '../products/Product';

export const LikedProducts = () => {
  const { user } = useContext(UserContext);
  
  return (
    <div className="latest-products-container">
      {
        user.likedProducts.length === 0 ? (
            <p>No hay productos guardados en favoritos</p>
          ) : (
            user.likedProducts.map(product => {
              return (
                <div className="latest-product">
                  <Product product={product} key={product._id} />
                </div>
              );
            })
          )
      }
    </div>
  )
}