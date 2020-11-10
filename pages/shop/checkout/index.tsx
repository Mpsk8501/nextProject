import { ShopLayout } from '../../../components/layouts/shopLayout'
import CheckoutForm from '../../../components/checkout/CheckoutForm'
const CheckoutPage = () => {
  return (
    <ShopLayout>
      <div className="container">
        <CheckoutForm />
      </div>
    </ShopLayout>
  )
}

export default CheckoutPage
