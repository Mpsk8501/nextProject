import CartIcon from '../../cartComponents/cartIcon'
import classes from './subHeader.module.scss'

const SubHeader = () => {
  return (
    <div className={classes.subHeader}>
      <div className={`container ${classes.wrapper}`}>
        <CartIcon />
      </div>
    </div>
  )
}

export default SubHeader
