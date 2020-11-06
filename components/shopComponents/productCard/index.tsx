import Link from 'next/link'
import { useRouter } from 'next/router'
import { ProductProps } from '../../../interfaces'
import AddToCartButton from '../../cartComponents/addToCartButton'
import classes from './product.module.scss'

const ProductCard = ({ product }: ProductProps) => {
  const router = useRouter()
  console.log(router.query)

  return (
    <div className={classes.product}>
      <h1 className="h1">{product.name}</h1>
      <Link
        as={`${router.query.category}/${product.slug}`}
        href={`categories/${router.query.category}?slug=${product.slug}`}
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
