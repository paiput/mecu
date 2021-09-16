import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
// components
import { Link } from 'react-router-dom';
import { PublishedProduct } from './PublishedProduct';

export const PublishedProducts = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    user.products.length > 0 ? (
      <div className="published-products-container">
        {user.products.map(product => {
          return <PublishedProduct product={product} key={product._id} />
        })}
      </div>
    ) : (
      <div>
        <p>Todavía no publicaste ningún producto</p>
        <Link to="/sell" className="form-link">Publicá tu primer producto</Link>
      </div>
    )
  )
}