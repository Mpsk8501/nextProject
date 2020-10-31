import Link from 'next/link'
import classes from './product.module.scss'

interface ComponentProps {
  productData: {
    name: string
    image: {
      sourceUrl: string
    }
    price: string
    databaseId: number
    slug: string
  }
}

const ProductCard = ({ productData }: ComponentProps) => {
  console.log('yttt', productData)

  return (
    <div className={classes.product}>
      <h1 className="h1">{productData.name}</h1>
      <Link
        as={`/product/${productData.slug}-${productData.databaseId}`}
        href={`/product?slug=${productData.slug}-${productData.databaseId}`}
      >
        <a>
          <img src={productData.image.sourceUrl} alt="product  image" />
        </a>
      </Link>
      <p>{productData.price}</p>
    </div>
  )
}

export default ProductCard
