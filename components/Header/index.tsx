import Link from '../../Hoc/ActiveLink'
import { FC } from 'react'
import classes from './header.module.scss'

const Header: FC = () => {
  return (
    <div className={classes.header}>
      <div className="container">
        <nav>
          <Link href="/">
            <a>LOGO</a>
          </Link>
          <Link activeClassName="activeLink" href="/">
            <a className="link">Главная</a>
          </Link>
          <Link activeClassName="activeLink" href="/colorSheme">
            <a className="link">Color Sheme</a>
          </Link>
          <Link activeClassName="activeLink" href="/wooauth">
            <a className="link">Woo auth</a>
          </Link>
          <Link
            as="/categories"
            activeClassName="activeLink"
            href="/categories"
          >
            <a className="link">Shop</a>
          </Link>
        </nav>
      </div>
    </div>
  )
}
export default Header
