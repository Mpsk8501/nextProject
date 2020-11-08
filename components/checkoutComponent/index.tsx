import { useRef, useState } from 'react'
import classes from './checkout.module.scss'
import { NetworkStatus, useQuery } from '@apollo/client'
import { CATEGORIES_QUERY } from '../../queries/categories'
const CheckoutComponent = () => {
  const refP = useRef()

  const { loading, error, data, refetch } = useQuery(CATEGORIES_QUERY, {
    onCompleted: () => {
      console.warn('completed GET_CART')
      console.log(data)
      refetch.bind(this)
    },
  })

  const addOrder = () => {}
  const getOrders = () => {
    refetch().then((e) => {
      console.log(e)
    })
  }

  return (
    <div className={classes.checkout}>
      <div className="container">
        <h1 className="h1">Checkout</h1>
        <button onClick={addOrder} className="btn">
          add order
        </button>
        <button onClick={getOrders} className="btn">
          get orders
        </button>
        <p ref={refP}></p>
      </div>
    </div>
  )
}

export default CheckoutComponent
