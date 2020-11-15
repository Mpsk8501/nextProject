import { useState, useContext, useEffect } from 'react'
import Billing from '../checkout/Billing'

import classes from '../checkout/checkout.module.scss'
import Link from 'next/link'

const UserForm = () => {
  // const initialState = {
  //   firstName: '',
  //   lastName: '',
  //   company: '',
  //   country: '',
  //   address1: '',
  //   address2: '',
  //   city: '',
  //   state: '',
  //   postcode: '',
  //   phone: '',
  //   email: '',
  //   createAccount: false,
  //   orderNotes: '',
  //   paymentMethod: '',
  //   errors: null,
  // }

  // Use this for testing purposes, so you dont have to fill the checkout form over an over again.
  const initialState = {
    firstName: 'Imran',
    lastName: 'Sayed',
    address1: '109 Hills Road Valley',
    address2: 'Station Road',
    city: 'Pune',
    state: 'Maharastra',
    country: 'ID',
    postcode: '400298',
    phone: '9959338989',
    email: 'imran@gmail.com',
    company: 'Tech',
    createAccount: false,
    orderNotes: '',
    paymentMethod: 'cod',
    errors: null,
  }

  const [input, setInput] = useState(initialState)
  const [isLogged, setIsLogged] = useState(false)
  const handleOnChange = (event) => {
    const newState = { ...input, [event.target.name]: event.target.value }
    setInput(newState)
  }

  useEffect(() => {
    if (localStorage.getItem('isLogged')) {
      setIsLogged(true)
    }
  }, [])

  const handleFormSubmit = (e) => {
    e.prevent.defoult()
  }

  return (
    <>
      {isLogged ? (
        <form onSubmit={handleFormSubmit} className={classes.form}>
          <h1 className="h1">Checkout</h1>
          {/*Billing Details*/}
          <h2 className="h2">Billing Details</h2>
          <div className={classes.formTextInput}>
            <Billing input={input} handleOnChange={handleOnChange} />
          </div>

          <button className="btn" type="submit">
            Place Order
          </button>
        </form>
      ) : (
        <>
          <p className="h2">You not authorized</p>
          <Link href="/shop">
            <button className="btn">Return</button>
          </Link>
        </>
      )}
    </>
  )
}

export default UserForm
