import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
// components
import { PublishedProduct } from "./PublishedProduct";

export const PublishedProducts = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="published-products-container">
      {user.products.map(product => {
        return <PublishedProduct product={product} key={product._id} />
      })}
    </div>
  )
}