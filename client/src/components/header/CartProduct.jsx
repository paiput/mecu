export const CartProduct = ({ product }) => {
  return (
    <div className="cart-product">
      <h4>{product.name}</h4>
      <p>${product.price}</p>
    </div>
  );
};