import gql from 'graphql-tag'

const GET_CART = gql`
  query GET_CART {
    cart {
      contents {
        nodes {
          key
          product {
            name
            description
            databaseId
            slug
            image {
              sourceUrl
            }
            productCategories {
              nodes {
                slug
              }
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
