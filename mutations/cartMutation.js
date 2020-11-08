import gql from 'graphql-tag'

const ADD_TO_CART = gql`
  mutation($input: AddToCartInput!) {
    addToCart(input: $input) {
      cartItem {
        product {
          id
          databaseId
          name
          description
          slug
          image {
            sourceUrl
          }
        }
        quantity
        total
      }
    }
  }
`
const CLEAR_CART = gql`
  mutation CLEAR_CART($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      cartItems {
        quantity
      }
    }
  }
`
const UPDATE_CART = gql`
  mutation($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      items {
        product {
          id
          databaseId
          name
          description

          slug

          image {
            sourceUrl
          }
        }
        quantity
        total
      }
      removed {
        product {
          id
          databaseId
        }
      }
      updated {
        product {
          id
          databaseId
        }
      }
    }
  }
`

export { ADD_TO_CART, CLEAR_CART, UPDATE_CART }
