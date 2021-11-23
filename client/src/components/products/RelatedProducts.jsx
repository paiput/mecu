import { LatestProduct } from "./LatestProduct"

export const RelatedProducts = ({ product }) => {
  return (
    product.user.products.length > 0 ? (
      <>
        <hr />
        <div className="related-products">
          <h3 className="related-products__title">Otros productos publicados por {product.user.username}</h3>
          <div className="related-products-container">
            {product.user.products.map(product => {
              return <LatestProduct product={product} key={product._id} />
            })}
          </div>
        </div>
      </>
      ) : ''
  )
}