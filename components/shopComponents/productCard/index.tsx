import Link from 'next/link'
import { ProductProps } from '../../../interfaces'
import AddToCartButton from '../../cartComponents/addToCartButton'
import classes from './product.module.scss'

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className={classes.product}>
      <h1 className="h1">{product.name}</h1>
      <Link
        as={`/product/${product.slug}-${product.databaseId}`}
        href={`/product?slug=${product.slug}-${product.databaseId}`}
      >
        <a>
          <img src={product.image.sourceUrl} alt="product  image" />
        </a>
      </Link>
      <p>{product.price}</p>
      <AddToCartButton product={product} />
    </div>
  )
}

export default ProductCard
