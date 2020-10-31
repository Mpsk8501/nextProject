import Link from '../../Hoc/ActiveLink'
import { FC } from 'react'
import classes from './header.module.scss'

const ShopHeader: FC = () => {
  return (
    <div className={classes.header}>
      <div className="container">
        <nav>
          <Link href="/">
            <a>LOGO</a>
          </Link>
          <Link activeClassName="activeLink" href="/products">
            <a className="link">Shop</a>
          </Link>
        </nav>
      </div>
    </div>
  )
}
export default ShopHeader
