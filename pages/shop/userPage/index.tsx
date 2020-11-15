import { ShopLayout } from '../../../components/layouts/shopLayout'
import CheckoutForm from '../../../components/checkout/CheckoutForm'
import UserForm from '../../../components/userPageComponents'
const UserPage = () => {
  return (
    <ShopLayout>
      <div className="container">
        <UserForm />
      </div>
    </ShopLayout>
  )
}

export default UserPage
