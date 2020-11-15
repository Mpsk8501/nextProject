import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client'
import { graphQlUrl } from '../settings'

export const middleware = new ApolloLink((operation, forward) => {
  if (!process.browser) {
    return forward(operation)
  }
  const isLogged = localStorage.getItem('isLogged')

  if (!isLogged) {
    const session = localStorage.getItem('woo-session')

    operation.setContext(({ headers = {} }) => ({
      headers: {
        'woocommerce-session': `Session ${session}`,
      },
    }))
  } else {
    const baseToken = localStorage.getItem('baseToken')
    operation.setContext(({ headers = {} }) => ({
      headers: {
        authorization: baseToken ? `Basic ${baseToken}` : '',
      },
    }))
  }
  return forward(operation)
})

export const afterware = new ApolloLink((operation, forward) => {
  if (!process.browser) {
    return forward(operation)
  }
  return forward(operation).map((response) => {
    const context = operation.getContext()
    const {
      response: { headers },
    } = context
    const session = headers.get('woocommerce-session')
    if (session) {
      if ('false' === session) {
        localStorage.removeItem('woo-session')
      } else if (localStorage.getItem('woo-session') !== session) {
        localStorage.setItem('woo-session', headers.get('woocommerce-session'))
      }
    }
    return response
  })
})

const client = new ApolloClient({
  link: middleware.concat(
    afterware.concat(
      createHttpLink({
        uri: graphQlUrl,
      })
    )
  ),
  cache: new InMemoryCache(),
})

export default client
