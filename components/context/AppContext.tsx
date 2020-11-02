import React, { useEffect, useState } from 'react'

export const AppContext = React.createContext([{}, () => {}])

export const AppProvider = (props) => {
  const [cart, setCart] = useState(null)
  useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem('woo-next-cart')
      cartData = cartData !== null ? JSON.parse(cartData) : ''
      setCart({ cartData })
    }
  }, [])
  console.log(cart)

  return (
    <AppContext.Provider value={[cart, setCart]}>
      {props.children}
    </AppContext.Provider>
  )
}