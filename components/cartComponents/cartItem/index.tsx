import { useState } from 'react'
import { removeItemFromCart, updateCart } from '../../../helpers/cartHelpers'
import { CartItemProps } from '../../../interfaces'
import Link from 'next/link'

const CartItem = ({ cartItem, setCart }: CartItemProps) => {
  const [productCount, setProductCount] = useState(cartItem.qty)

  const removeHandler = () => {
    const updatedCart = removeItemFromCart(cartItem.databaseId)
    //@ts-ignore
    setCart(updatedCart)
  }

  const handleQtyChange = (event) => {
    if (process.browser) {
      const newQty = event.target.value
      setProductCount(newQty)
      const existingCart = localStorage.getItem('woo-next-cart')
      const existingCartParse = JSON.parse(existingCart)
      //@ts-ignore
      const updatedCart = updateCart(cartItem, existingCartParse, false, newQty)
      //@ts-ignore
      setCart(updatedCart)
    }
  }

  return (
    <ul>
      <li>
        <span onClick={removeHandler}>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 32 32"
          >
            <title>cross</title>
            <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
          </svg>
        </span>
      </li>
      <li>
        <Link
          href={`/shop/${encodeURIComponent(
            cartItem.productCategorySlug
          )}/${encodeURIComponent(cartItem.productSlug)}`}
        >
          <img src={cartItem.image.sourceUrl} alt="Product image" />
        </Link>
      </li>
      <li>{cartItem.name}</li>
      <li>£{cartItem.price}</li>
      <li>
        <input
          onChange={handleQtyChange}
          min={'1'}
          max={'10'}
          value={productCount}
          type="number"
        />
      </li>
      <li>£{cartItem.totalPrice}</li>
    </ul>
  )
}

export default CartItem
