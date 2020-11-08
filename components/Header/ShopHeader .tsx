import Link from '../../Hoc/ActiveLink'
import { FC, useContext } from 'react'
import classes from './header.module.scss'

import { AppContext } from './../context/AppContext'

const ShopHeader: FC = () => {
  const [cart, setCart] = useContext(AppContext)

  return (
    <div className={classes.header}>
      <div className="container">
        <nav>
          <Link href="/shop">
            <a>LOGO</a>
          </Link>
          <Link activeClassName="activeLink" href="/colorSheme">
            <a className="link">Color Sheme</a>
          </Link>
          <Link activeClassName="activeLink" href="/shop/categories">
            <a className="link">Categories</a>
          </Link>
        </nav>
      </div>
    </div>
  )
}
export default ShopHeader
