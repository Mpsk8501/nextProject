import gql from 'graphql-tag'

const GET_CART = gql`
  query GET_CART {
    cart {
      contents {
        nodes {
          product {
            name
            description
            databaseId
            slug
            image {
              sourceUrl
            }
          }

          quantity
          total
        }
      }
      total
    }
  }
`

export { GET_CART }
