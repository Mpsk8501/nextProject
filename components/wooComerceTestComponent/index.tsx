import { FC, useState } from 'react'
import classes from './wooTest.module.scss'

const WooTest: FC = () => {
  const [goodsList, setGoodList] = useState<string>('')
  const connectCommerce = async () => {
    const response = await fetch('api/wooauth')
    const list = await response.json()
    let str = ''
    for (let key in list) {
      str += `${key}:${list[key]}`
    }
    setGoodList(str)
  }
  const setGood = async () => {
    const response = await fetch('api/wooauth?id=44')
    const list = await response.json()
    let str = ''
    for (let key in list) {
      str += `${key}:${list[key]}`
    }
    setGoodList(str)
  }

  const createUser = async () => {
    const response = await fetch('api/wooauth?id=createUser')
    const userList = await response.json()
    console.log(userList)
  }

  return (
    <>
      <section className={classes.wooTest}>
        <div className="container">
          <h1 className="h1">Test wooCommerce</h1>
          <button className="btn" onClick={connectCommerce}>
            test connect wooCommerce from apiKey woocommerce
          </button>
          <button className="btn" onClick={setGood}>
            setGoode
          </button>
          <button className="btn" onClick={createUser}>
            createUser
          </button>
          <div>{goodsList}</div>
        </div>
      </section>
    </>
  )
}

export default WooTest
