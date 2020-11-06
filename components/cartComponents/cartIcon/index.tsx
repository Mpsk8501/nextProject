import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import classes from './cartIcon.module.scss'
import Link from 'next/link'

const CartIcon = () => {
  const [cart, setCart] = useContext(AppContext)

  const productCount =
    //@ts-ignore
    cart && Object.keys(cart).length !== null ? cart.totalProductCount! : ''
  const totalPrice =
    //@ts-ignore
    cart && Object.keys(cart).length !== null ? cart.totalProductPrice : ''

  return (
    <div className={classes.iconBlock}>
      <Link href="/cart">
        <a>
          <span>{totalPrice ? `£${totalPrice}` : ''}</span>
          <span>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <title>cart</title>
              <path d="M12 29c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"></path>
              <path d="M32 29c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z"></path>
              <path d="M32 16v-12h-24c0-1.105-0.895-2-2-2h-6v2h4l1.502 12.877c-0.915 0.733-1.502 1.859-1.502 3.123 0 2.209 1.791 4 4 4h24v-2h-24c-1.105 0-2-0.895-2-2 0-0.007 0-0.014 0-0.020l26-3.98z"></path>
            </svg>
          </span>
          <span> {productCount ? productCount : ''}</span>
        </a>
      </Link>
    </div>
  )
}

export default CartIcon