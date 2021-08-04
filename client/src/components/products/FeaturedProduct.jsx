import { Product } from './Product';

export const FeaturedProduct = () => {
  return (
    <div className="product-card featured-product">
      <div className="product__title-container">
        <h3 className="product__title">Producto destacado</h3>
      </div>
      <Product />
    </div>
  )
}