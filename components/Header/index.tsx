import Link from 'next/link'
import classes from './header.module.scss'
const Header = () => {
  return (
    <div className={classes.header}>
      <div className="container">
        <h1 className="h1">Header</h1>
        <nav>
          <Link href="/">
            <a>Главная</a>
          </Link>
          <Link href="/colorSheme">
            <a>Color Sheme</a>
          </Link>
          <Link href="/wooCommerceTest">
            <a>wooTeste</a>
          </Link>
        </nav>
      </div>
    </div>
  )
}
export default Header
