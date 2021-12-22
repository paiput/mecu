import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Product } from '../products/Product';

export const PurchasedProducts = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user.purchasedProducts.map(product => {
        return (
          <div key={product._id} className="latest-product">
            <Product product={product} />
          </div>
        );
      })}
    </div>
  );
};