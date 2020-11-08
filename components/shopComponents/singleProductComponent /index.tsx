import Link from 'next/link'
import { ProductProps } from '../../../interfaces'
import classes from './singleProduct.module.scss'

const SingleProductComponent = ({ product }: ProductProps) => {
  //@ts-ignore
  const categorySlug = product.productCategories.edges[0].node.slug
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
            <Link href={`/shop/${encodeURIComponent(categorySlug)}`}>
              <a className={'btn'}>To category</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductComponent
