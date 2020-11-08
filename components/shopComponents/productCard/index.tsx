import Link from 'next/link'
import { ProductProps } from '../../../interfaces'
import AddToCartButton from '../../cartComponents/addToCartButton'
import classes from './product.module.scss'

const ProductCard = ({ product, type }: ProductProps) => {
  const categorySlug =
    //@ts-ignore
    product.categorySlug || product.productCategories.edges[0].node.slug
  return (
    <div className={classes.product}>
      {type ? <span className={classes.tag}>{type}</span> : null}
      <h1 className="h1">{product.name}</h1>
      <Link
        href={`/shop/${encodeURIComponent(categorySlug)}/${encodeURIComponent(
          product.slug
        )}`}
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
