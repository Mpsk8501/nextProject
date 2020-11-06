import Link from 'next/link'
import { useRouter } from 'next/router'
import { ProductProps } from '../../../interfaces'
import classes from './singleProduct.module.scss'

const SingleProductComponent = ({ product }: ProductProps) => {
  const router = useRouter()
  console.log(router.query)

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
            <Link href={`/categories/${router.query.category}`}>
              <a className={'btn'}>Back</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductComponent
