import Link from 'next/link'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import CartItem from './cartItem'
import classes from './cartPageComponent.module.scss'

const CartPageComponent = () => {
  const [cart, setCart] = useContext(AppContext)
  return (
    <div className="container">
      {cart ? (
        <div className={classes.cartPage}>
          <h1 className="h1">Cart</h1>
          <div className={classes.tableBlock}>
            <ul>
              <li></li>
              <li></li>
              <li>Product</li>
              <li>Price</li>
              <li>Quntity</li>
              <li>Total</li>
            </ul>
            {
              //@ts-ignore
              cart.products.map((item) => {
                return (
                  <CartItem
                    //@ts-ignore
                    setCart={setCart}
                    key={item.databaseId}
                    cartItem={item}
                  />
                )
              })
            }
          </div>
          <div className={classes.totalBlock}>
            <h2 className="h1">Cart total</h2>
            <div className={classes.totalWrapper}>
              <span>Total</span>
              <span>
                £
                {
                  //@ts-ignore
                  cart.totalProductPrice
                }
              </span>
            </div>
            <div className={classes.checkout}>
              <Link href="/checkout">
                <button className="btn">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.noItem}>
          <h1 className="h1">No products</h1>
          <Link href="/products">
            <button className="btn">Add New Product</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartPageComponent
