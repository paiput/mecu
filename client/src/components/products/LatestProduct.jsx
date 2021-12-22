import { Product } from './Product';

export const LatestProduct = ({ product }) => {
  return (
    <div className="latest-product">
      <Product product={product} />
    </div>
  );
};