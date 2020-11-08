import { FC } from 'react'
import Head from 'next/head'
import ShopHeader from '../Header/ShopHeader '
import Footer from '../Footer'
import { AppProvider } from '../context/AppContext'
import SubHeader from '../Header/subHeader'
import client from '../ApolloClient'
import { ApolloProvider } from '@apollo/client'
const ShopLayout: FC = ({ children }) => {
  return (
    <AppProvider>
      <ApolloProvider client={client}>
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
          <SubHeader />
          {children}
        </div>
        <Footer />
      </ApolloProvider>
    </AppProvider>
  )
}

export { ShopLayout }
