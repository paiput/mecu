import { LatestProduct } from './LatestProduct';

export const LatestProducts = ({ products }) => {
  return (
    <div className="product-card latest-products">
      <div className="product__title-container">
        <h3 className="product__title">Últimas publicaciones</h3>
      </div>
      <div className="latest-products-container">
        {
          products.map(product => <LatestProduct key={product._id} product={product} />)
        }
      </div>
    </div>
  )
}