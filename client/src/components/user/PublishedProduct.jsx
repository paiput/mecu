export const PublishedProduct = ({ product }) => {
  return (
    <div className="published-product product-card">
      <h3 className="published-product__title">{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <p>quedan {product.quantity}</p>
      <button className="primary-danger-button text-button">Borrar publicacion</button>
    </div>
  )
}