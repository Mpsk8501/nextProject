import classes from './shopMainPage.module.scss'
import ProductCard from '../shopComponents/productCard'

const ShopMainPageComponent = ({ newProducts, saleProducts, title = '' }) => {
  return (
    <section className={classes.shopMainPage}>
      <div className="container">
        <h1 className="h1">{title || 'Test Shop'}</h1>
        <h2 className="h2">New Products:</h2>
        <div className={classes.productList}>
          {newProducts.length
            ? newProducts.map((item) => {
                //@ts-ignore
                return (
                  <ProductCard
                    key={item.databaseId}
                    type={'new'}
                    product={item}
                  />
                )
              })
            : ''}
        </div>
        <h2 className="h2">Sale:</h2>
        <div className={classes.productList}>
          {saleProducts.length
            ? saleProducts.map((item) => {
                //@ts-ignore
                return (
                  <ProductCard
                    type={'sale'}
                    key={item.databaseId}
                    product={item}
                  />
                )
              })
            : ''}
        </div>
      </div>
    </section>
  )
}

export default ShopMainPageComponent
