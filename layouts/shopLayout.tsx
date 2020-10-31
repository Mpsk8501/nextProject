import { FC } from 'react'
import Head from 'next/head'
import ShopHeader from '../components/Header/ShopHeader '
import Footer from '../components/Footer'

const ShopLayout: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Sass test</title>
        <meta name="description" content="Wp + WooCommerce + GraphQl" />
        <meta charSet="utf-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,600;0,700;1,500&family=Roboto:wght@100;300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex-wrapper">
        <ShopHeader />
        {children}
      </div>
      <Footer />
    </>
  )
}

export { ShopLayout }
