import Link from 'next/link'
import { ProductProps } from '../../../interfaces'
import classes from './singleProduct.module.scss'

const SingleProductComponent = ({ product }: ProductProps) => {
  return (
    <div className={classes.singleProduct}>
      <div className="container">
        <h1 className="h1">{product.name}</h1>
        <div className={classes.productBlock}>
          <img src={product.image.sourceUrl} alt="product  image" />
          <div className={classes.textBlock}>
            <p className="p">{product.description}</p>
            <p className="p">
              <strong>{product.price}</strong>
            </p>
            <Link href="/products">
              <a className={'btn'}>Back</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductComponent
