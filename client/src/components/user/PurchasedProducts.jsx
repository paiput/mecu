import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Product } from "../products/Product";

export const PurchasedProducts = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      {user.purchasedProducts.map(product => {
          return (
            <div className="latest-product">
              <Product product={product} key={product._id} />
            </div>
          )
        })}
    </div>
  )
}