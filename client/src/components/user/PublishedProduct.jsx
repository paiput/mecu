export const PublishedProduct = ({ product }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>quedan {product.quantity}</p>
    </div>
  )
}