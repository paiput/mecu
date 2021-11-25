// imports
import { useState, useEffect } from "react";
import userService from '../../services/users';
// components
import { LatestProduct } from "./LatestProduct"

export const RelatedProducts = ({ user }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    userService.getUserProducts(user)
      .then(products => {
        setRelatedProducts(products);
      })
  }, [user]);

  return (
    relatedProducts.length > 0 ? (
      <>
        <hr />
        <div className="related-products">
          <h3 className="related-products__title">Otros productos publicados por {user}</h3>
          <div className="related-products-container">
            {relatedProducts.map(product => {
              return <LatestProduct product={product} key={product._id} />
            })}
          </div>
        </div>
      </>
      ) : ''
  )
}