import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { graphQlUrl } from '../settings'

// export const middleware = new ApolloLink((operation, forward) => {
//   /**
//    * If session data exist in local storage, set value as session header.
//    */
//   const session = process.browser ? localStorage.getItem('woo-session') : null

//   if (session) {
//     operation.setContext(({ headers = {} }) => ({
//       headers: {
//         'woocommerce-session': `Session ${session}`,
//       },
//     }))
//   }

//   return forward(operation)
// })

// /**
//  * Afterware operation.
//  *
//  * This catches the incoming session token and stores it in localStorage, for future GraphQL requests.
//  */
// export const afterware = new ApolloLink((operation, forward) => {
//   return forward(operation).map((response) => {
//     /**
//      * Check for session header and update session in local storage accordingly.
//      */
//     const context = operation.getContext()
//     const {
//       response: { headers },
//     } = context
//     const session = headers.get('woocommerce-session')

//     if (session) {
//       // Remove session data if session destroyed.
//       if (process.browser) {
//         if ('false' === session) {
//           localStorage.removeItem('woo-session')

//           // Update session new data if changed.
//         } else if (localStorage.getItem('woo-session') !== session) {
//           localStorage.setItem(
//             'woo-session',
//             headers.get('woocommerce-session')
//           )
//         }
//       }
//     }

//     return response
//   })
// })

// const client = new ApolloClient({
//   link: middleware.concat(
//     afterware.concat(
//       createHttpLink({
//         uri: graphQlUrl,
//       })
//     )
//   ),
//   cache: new InMemoryCache(),
// })

//Apollo GraphQL client.
// const client = new ApolloClient({
//   uri: graphQlUrl,
//   cache: new InMemoryCache(),
// })
/////////////Auth/////////////

const authLink = setContext((_, { headers }) => {
  if (process.browser) {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token')
    const session = localStorage.getItem('woo-session')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'woocommerce-session': `Session ${session}`,
      },
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(createHttpLink({ uri: graphQlUrl })),
  cache: new InMemoryCache(),
})

export default client
