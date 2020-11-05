import Link from 'next/link'
import classes from './category.module.scss'

const CategoryCard = ({ category }) => {
  return (
    <div className={classes.categoryCard}>
      <h1 className="h1">{category.name}</h1>
      <Link
        as={`/category/${category.slug}-${category.databaseId}`}
        href={`/category?category=${category.slug}-${category.databaseId}`}
      >
        <a>
          {category.image ? (
            <img src={category.image.sourceUrl} alt="category image" />
          ) : (
            'no image'
          )}
        </a>
      </Link>
    </div>
  )
}

export default CategoryCard
