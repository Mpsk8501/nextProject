import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  link: createHttpLink({
    uri: process.env.WP_GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
})

export default client
