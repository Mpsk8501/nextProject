import { useContext, useState } from 'react'
import { ProductProps } from '../../../interfaces'
import { AppContext } from '../../context/AppContext'
import { useMutation, useQuery } from '@apollo/client'
import { v4 } from 'uuid'
import { ADD_TO_CART } from '../../../mutations/cartMutation'
import { GET_CART } from '../../../queries/cart'

import { getFormattedCart } from '../../../helpers/cartHelpers'
import Link from 'next/link'

const AddToCartButton = ({ product }: ProductProps) => {
  const [cart, setCart] = useContext(AppContext)
  const [isInCart, setIsItCart] = useState(false)

  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId: product.databaseId,
  }

  const onComplitedF = (data) => {
    const updatedCart = getFormattedCart(data)
    console.log('fff', updatedCart)

    localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart))

    //Update cart data in React Context.
    setCart(updatedCart)
  }

  const { loading, error, data, refetch } = useQuery(GET_CART, {
    onCompleted: () => {
      refetch.bind(this)
      onComplitedF(data)
    },
    // Update cart in the localStorage.
  })

  const [
    addToCart,
    { data: cartData, loading: addLoading, error: addToCartError },
  ] = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    onCompleted: () => {
      console.warn('completed ADD_TO_CART', data)
      // On Success:
      // 1. Make the GET_CART query to update the cart with new values in React context.
      refetch().then((e) => {
        console.log(e)
        onComplitedF(e.data)
      })
      // 2. Show View Cart Button
      //setShowViewCart(true)
    },
  })

  const handleAddToCartClick = () => {
    addToCart()
    setIsItCart(true)
  }

  // useEffect(() => {
  //   if (process.browser) {
  //     const existCart = localStorage.getItem('woo-next-cart')
  //     if (existCart) {
  //       const existCartParse = JSON.parse(existCart)
  //       if (
  //         isProductInCart(existCartParse.products, product.databaseId) !== -1
  //       ) {
  //         setIsItCart(true)
  //       }
  //     }
  //   }
  // }, [])

  // const handleAddToCartClick = () => {
  //   if (process.browser) {
  //     const existCart = localStorage.getItem('woo-next-cart')
  //     if (existCart) {
  //       const existCartParse = JSON.parse(existCart)
  //       const qtyToBeAdded = 1
  //       const updatedCart = updateCart(product, existCartParse, qtyToBeAdded)
  //       //@ts-ignore
  //       setCart(updatedCart)
  //     } else {
  //       const newCart = addFirstProduct(product)
  //       //@ts-ignore
  //       setCart(newCart)
  //     }
  //     setIsItCart(true)
  //   }
  // }
  return (
    <>
      {addLoading || loading ? (
        <button className="btn">Loading...</button>
      ) : (
        <button onClick={handleAddToCartClick} className="btn">
          Add to Cart
        </button>
      )}

      {isInCart ? (
        <Link href="/shop/cart">
          <button className="btn">Viev in cart</button>
        </Link>
      ) : (
        ''
      )}
    </>
  )
}
export default AddToCartButton
