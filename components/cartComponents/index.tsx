import Link from 'next/link'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import CartItem from './cartItem'
import classes from './cartPageComponent.module.scss'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CART } from '../../queries/cart'
import { UPDATE_CART, CLEAR_CART } from '../../mutations/cartMutation'
import { getFormattedCart, getUpdatedItems } from '../../helpers/cartHelpers'

const CartPageComponent = () => {
  const [cart, setCart] = useContext(AppContext)

  const onComplitedF = (data) => {
    const updatedCart = getFormattedCart(data)
    localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart))
    //@ts-ignore
    setCart(updatedCart)
  }

  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      refetch.bind(this)
      onComplitedF(data)
    },
  })

  const [
    updateCart,
    {
      data: updateCartResponse,
      loading: updateCartProcessing,
      error: updateCartError,
    },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      refetch().then((e) => {
        onComplitedF(e.data)
      })
    },
  })

  const [
    clearCart,
    { data: clearCartRes, loading: clearCartProcessing, error: clearCartError },
  ] = useMutation(CLEAR_CART, {
    onCompleted: () => {
      refetch().then((e) => {
        onComplitedF(e.data)
      })
    },
  })

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
                    key={item.databaseId}
                    item={item}
                    updateCartProcessing={updateCartProcessing}
                    products={cart.products}
                    updateCart={updateCart}
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
                {
                  //@ts-ignore
                  cart.totalProductsPrice
                }
              </span>
            </div>
            <div className={classes.checkout}>
              <Link href="/shop/checkout">
                <button className="btn">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.noItem}>
          <h1 className="h1">No products</h1>
          <Link href="/shop">
            <button className="btn">Add New Product</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CartPageComponent
