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
    }
  }
`

export { ADD_TO_CART, CLEAR_CART, UPDATE_CART }
