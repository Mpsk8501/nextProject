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
          <Link href="/">
            <a>LOGO</a>
          </Link>
          <Link activeClassName="activeLink" href="/categories">
            <a className="link">Shop</a>
          </Link>
          <Link activeClassName="activeLink" href="/categories">
            <a className="link">Categories</a>
          </Link>
        </nav>
      </div>
    </div>
  )
}
export default ShopHeader
