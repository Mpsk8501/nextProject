import classes from '*.module.css'

import classes2 from './checkout.module.scss'

const CheckoutComponent = () => {
  return (
    <div className={classes2.checkout}>
      <div className="container">
        <h1 className="h1">Checkout</h1>
      </div>
    </div>
  )
}

export default CheckoutComponent
