import Link from 'next/link'
import classes from './category.module.scss'

const CategoryCard = ({ category }) => {
  return (
    <div className={classes.categoryCard}>
      <h1 className="h1">{category.name}</h1>
      <Link href={`/shop/categories/${encodeURIComponent(category.slug)}`}>
        <a>
          {category.image && category.image.sourceUrl ? (
            <img src={category.image.sourceUrl} alt="product  image" />
          ) : (
            <img src={'/no-image.jpg'} alt="product  image" />
          )}
        </a>
      </Link>
    </div>
  )
}

export default CategoryCard
