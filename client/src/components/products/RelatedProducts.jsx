import { LatestProduct } from "./LatestProduct"

export const RelatedProducts = ({ user, products }) => {
  console.log('related products:', products)
  console.log('related products publisher:', user);
  return (
    products.length > 0 ? (
      <>
        <hr />
        <div className="related-products">
          <h3 className="related-products__title">Otros productos publicados por {user}</h3>
          <div className="related-products-container">
            {products.map(product => {
              return <LatestProduct product={product} key={product._id} />
            })}
          </div>
        </div>
      </>
      ) : ''
  )
}