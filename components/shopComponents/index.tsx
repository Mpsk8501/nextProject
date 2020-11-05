import classes from './shopComponent.module.scss'
import ProductCard from './productCard'

const ShopComponent = ({ data, title = false }) => {
  return (
    <section className={classes.shopComponent}>
      <div className="container">
        <h1 className="h1">{title || 'Test Shop'}</h1>
        <div className={classes.productList}>
          {data.length
            ? data.map((item) => {
                //@ts-ignore
                return <ProductCard key={item.databaseId} product={item} />
              })
            : ''}
        </div>
      </div>
    </section>
  )
}

export default ShopComponent
