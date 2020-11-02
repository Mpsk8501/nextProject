import classes from './shopComponent.module.scss'
import ProductCard from './productCard'

interface ComponentProps {
  data: []
}

const ShopComponent = ({ data }: ComponentProps) => {
  return (
    <section className={classes.shopComponent}>
      <div className="container">
        <h1 className="h1">Test Shop</h1>
        <div className={classes.productList}>
          {data.length
            ? data.map((item) => {
                return <ProductCard key={item.id} product={item} />
              })
            : ''}
        </div>
      </div>
    </section>
  )
}

export default ShopComponent
