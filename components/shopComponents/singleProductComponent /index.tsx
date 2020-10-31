import Link from 'next/link'
import classes from './singleProductComponent .module.scss'

interface ComponentProps {
  productData: {
    name: string
    image: {
      sourceUrl: string
    }
    price: string
  }
}

const SingleProductComponent = ({ productData }: ComponentProps) => {
  console.log('yttt', productData)

  return (
    <div className={classes.product}>
      <h1 className="h1">{productData.name}</h1>
      <Link href="/product">
        <a>
          <img src={productData.image.sourceUrl} alt="product  image" />
        </a>
      </Link>
      <p>{productData.price}</p>
    </div>
  )
}

export default SingleProductComponent
