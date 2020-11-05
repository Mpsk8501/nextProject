import classes from './category.module.scss'
import CategoryCard from './categoryCard'

const CategoryComponent = ({ data }) => {
  return (
    <section className={classes.categories}>
      <div className="container">
        <h1 className="h1">Categories</h1>
        <div className={classes.productList}>
          {data.length
            ? data.map((item) => {
                return <CategoryCard key={item.databaseId} category={item} />
              })
            : ''}
        </div>
      </div>
    </section>
  )
}

export default CategoryComponent
