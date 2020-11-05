import { useContext, useEffect, useState } from 'react'
import { ProductProps } from '../../../interfaces'
import { AppContext } from '../../context/AppContext'
import {
  addFirstProduct,
  updateCart,
  isProductInCart,
} from '../../../helpers/cartHelpers'
import Link from 'next/link'

const AddToCartButton = ({ product }: ProductProps) => {
  const [cart, setCart] = useContext(AppContext)
  const [isInCart, setIsItCart] = useState(false)

  useEffect(() => {
    if (process.browser) {
      const existCart = localStorage.getItem('woo-next-cart')
      if (existCart) {
        const existCartParse = JSON.parse(existCart)
        if (
          isProductInCart(existCartParse.products, product.databaseId) !== -1
        ) {
          setIsItCart(true)
        }
      }
    }
  }, [])

  const handleAddToCartClick = () => {
    if (process.browser) {
      const existCart = localStorage.getItem('woo-next-cart')
      if (existCart) {
        const existCartParse = JSON.parse(existCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCart(product, existCartParse, qtyToBeAdded)
        //@ts-ignore
        setCart(updatedCart)
      } else {
        const newCart = addFirstProduct(product)
        //@ts-ignore
        setCart(newCart)
      }
      setIsItCart(true)
    }
  }
  return (
    <>
      <button onClick={handleAddToCartClick} className="btn">
        Add to Cart
      </button>
      {isInCart ? (
        <Link href="/cart">
          <button className="btn">Viev in cart</button>
        </Link>
      ) : (
        ''
      )}
    </>
  )
}
export default AddToCartButton
