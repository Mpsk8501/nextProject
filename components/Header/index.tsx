export default Header

import Link from 'next/link'
import { FC } from 'react'
import classes from './header.module.scss'

const Header: FC = () => {
  return (
    <div className={classes.header}>
      <div className="container">
        <h1 className="h1">Header</h1>
        <nav>
          <Link activeClassName="activeLink" href="/">
            <a className="link">Главная</a>
          </Link>
          <Link activeClassName="activeLink" href="/colorSheme">
            <a className="link">Color Sheme</a>
          </Link>
          <Link activeClassName="activeLink" href="/wooCommerceTest">
            <a className="link">wooTeste</a>
          </Link>
        </nav>
      </div>
    </div>
  )
}
export default Header
