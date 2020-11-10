import { useState, useContext, useEffect } from 'react'
import Billing from './Billing'
import YourOrder from './YourOrder'
import PaymentModes from './PaymentModes'
import { AppContext } from '../context/AppContext'
import validateAndSanitizeCheckoutForm from '../../validator/checkout'
import { useMutation, useQuery } from '@apollo/client'
import { getFormattedCart, createCheckoutData } from '../../helpers/cartHelpers'
import OrderSuccess from './OrderSucess'
import { GET_CART } from '../../queries/cart'
import { CHECKOUT_MUTATION } from '../../mutations/checkout'
import classes from './checkout.module.scss'

const CheckoutForm = () => {
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

  const [cart, setCart] = useContext(AppContext)
  const [input, setInput] = useState(initialState)
  const [orderData, setOrderData] = useState(null)
  const [requestError, setRequestError] = useState(null)

  const onComplitedF = (data) => {
    // console.warn( 'completed GET_CART' );

    // Update cart in the localStorage.
    const updatedCart = getFormattedCart(data)
    localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart))

    // Update cart data in React Context.
    setCart(updatedCart)
  }

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      refetch.bind(this)
      onComplitedF(data)
    },
  })

  // Checkout or CreateOrder Mutation.
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading },
  ] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: orderData,
    },
    onCompleted: () => {
      // console.warn( 'completed CHECKOUT_MUTATION' );
      refetch().then((e) => {
        onComplitedF(e.data)
      })
    },
  })

  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleFormSubmit = (event) => {
    event.preventDefault()
    const result = validateAndSanitizeCheckoutForm(input)

    if (!result.isValid) {
      setInput({ ...input, errors: result.errors })
      return
    }
    const checkOutData = createCheckoutData(input)
    setOrderData(checkOutData)
    console.log(checkOutData)
    setRequestError(null)
  }

  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleOnChange = (event) => {
    if ('createAccount' === event.target.name) {
      const newState = { ...input, [event.target.name]: !input.createAccount }
      setInput(newState)
    } else {
      const newState = { ...input, [event.target.name]: event.target.value }
      setInput(newState)
    }
  }

  useEffect(() => {
    if (null !== orderData) {
      // Call the checkout mutation when the value for orderData changes/updates.
      checkout()
    }
  }, [orderData])

  return (
    <>
      {cart ? (
        <form onSubmit={handleFormSubmit} className={classes.form}>
          <h1 className="h1">Checkout</h1>
          {/*Billing Details*/}
          <h2 className="h2">Billing Details</h2>
          <div className={classes.formTextInput}>
            <Billing input={input} handleOnChange={handleOnChange} />
          </div>
          {/* Order & Payments*/}
          {/*	Order*/}
          <h2 className="h2">Your Order</h2>
          <YourOrder cart={cart} />

          {/*Payment*/}
          <PaymentModes input={input} handleOnChange={handleOnChange} />

          <button className="btn" type="submit">
            Place Order
          </button>

          {/* Checkout Loading*/}
          {checkoutLoading && <p>Processing Order...</p>}
          {requestError && <p>Error : {requestError} :( Please try again</p>}
        </form>
      ) : (
        ''
      )}

      {/*	Show message if Order Sucess*/}
      <OrderSuccess response={checkoutResponse} />
    </>
  )
}

export default CheckoutForm
