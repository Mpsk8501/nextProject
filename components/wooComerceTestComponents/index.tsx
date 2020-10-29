import { useState } from 'react'

export default function WooTest() {
  const [goodsList, setGoodList] = useState('')
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
  return (
    <>
      <h1>Test</h1>
      <button onClick={connectCommerce}>test connect wooCommerce</button>
      <button onClick={setGood}>setGoode</button>
      <div>{goodsList}</div>
    </>
  )
}
