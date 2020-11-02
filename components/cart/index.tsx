import { useContext } from 'react'
import { ProductProps } from '../../interfaces'
import { AppContext } from '../context/AppContext'
import { addFirstProduct } from '../../helpers/cartHelpers'

const AddToCartButton = ({ product }: ProductProps) => {
  const [cart, setCart] = useContext(AppContext)

  const handleAddToCArtClick = () => {
    if (process.browser) {
      const existCart = localStorage.getItem('woo-next-cart')
      if (existCart) {
      } else {
        const newCart = addFirstProduct(product)

        //setCart(newCart)
      }
    }
  }
  return (
    <button onClick={handleAddToCArtClick} className="btn">
      Add to Cart
    </button>
  )
}
export default AddToCartButton
