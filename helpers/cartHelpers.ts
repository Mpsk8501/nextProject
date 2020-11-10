import { v4 } from 'uuid'

const getFloatVal = (string: string): number => {
  let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)
  if (floatValue[1]) {
    //@ts-ignore
    floatValue = floatValue.join('')
  }

  return floatValue !== null
    ? //@ts-ignore
      parseFloat(parseFloat(floatValue).toFixed(2))
    : 0
}

const getFormattedCart = (data) => {
  let formattedCart = null

  if (undefined === data || !data.cart.contents.nodes.length) {
    return formattedCart
  }

  const givenProducts = data.cart.contents.nodes

  // Create an empty object.
  formattedCart = {}
  formattedCart.products = []
  let totalProductsCount = 0

  for (let i = 0; i < givenProducts.length; i++) {
    const givenProduct = givenProducts[i].product
    const product = {}
    const total = getFloatVal(givenProducts[i].total)

    product.databaseId = givenProduct.databaseId
    product.cartKey = givenProducts[i].key
    product.name = givenProduct.name
    product.qty = givenProducts[i].quantity
    product.price = total / product.qty
    product.totalPrice = givenProducts[i].total
    product.slug = givenProduct.slug
    product.image = {
      sourceUrl:
        givenProduct.image && givenProduct.image.sourceUrl
          ? givenProduct.image.sourceUrl
          : '/no-image.jpg',
    }
    product.categorySlug = givenProduct.productCategories.nodes[0].slug

    totalProductsCount += givenProducts[i].quantity

    // Push each item into the products array.
    formattedCart.products.push(product)
  }

  formattedCart.totalProductsCount = totalProductsCount
  formattedCart.totalProductsPrice = data.cart.total

  return formattedCart
}

const getUpdatedItems = (products, newQty, cartKey) => {
  // Create an empty array.
  const updatedItems = []

  // Loop through the product array.
  products.map((cartItem) => {
    // If you find the cart key of the product user is trying to update, push the key and new qty.

    if (cartItem.cartKey === cartKey) {
      updatedItems.push({
        key: cartItem.cartKey,
        quantity: parseInt(newQty),
      })

      // Otherwise just push the existing qty without updating.
    } else {
      updatedItems.push({
        key: cartItem.cartKey,
        quantity: cartItem.qty,
      })
    }
  })
  return updatedItems
}

export const createCheckoutData = (order) => {
  const checkoutData = {
    clientMutationId: v4(),

    billing: {
      firstName: order.firstName,
      lastName: order.lastName,
      address1: order.address1,
      address2: order.address2,
      city: order.city,
      country: order.country,
      state: order.state,
      postcode: order.postcode,
      email: order.email,
      phone: order.phone,
      company: order.company,
    },
    shipping: {
      firstName: order.firstName,
      lastName: order.lastName,
      address1: order.address1,
      address2: order.address2,
      city: order.city,
      country: order.country,
      state: order.state,
      postcode: order.postcode,
      email: order.email,
      phone: order.phone,
      company: order.company,
    },
    shipToDifferentAddress: false,
    paymentMethod: order.paymentMethod,
    isPaid: false,
    transactionId: 'hjkhjkhsdsdiui',
  }

  return checkoutData
}

// const addFirstProduct = (product: ProductPropsFunc) => {
//   const productPrice = getFloatVal(product.price)
//   const newCart = {
//     products: [],
//     totalProductCount: 1,
//     totalProductPrice: getFloatVal(product.price),
//   }
//   const newProduct = createNewProduct(product, productPrice, 1)
//   newCart.products.push(newProduct)
//   localStorage.setItem('woo-next-cart', JSON.stringify(newCart))
//   return newCart
// }

// const updateCart = (
//   product: ProductPropsFunc,
//   existCart,
//   qtyToBeAdded,
//   newQty = false
// ) => {
//   const updatedProducts = getUpdatedProducts(
//     existCart.products,
//     product,
//     qtyToBeAdded,
//     newQty
//   )

//   const addPrice = (total, item) => {
//     total.totalPrice += +item.totalPrice
//     total.qty += item.qty

//     return total
//   }

//   const total = updatedProducts.reduce(addPrice, { totalPrice: 0, qty: 0 })

//   const updatedCart = {
//     products: updatedProducts,
//     totalProductCount: parseInt(total.qty),
//     totalProductPrice: parseFloat(parseFloat(total.totalPrice).toFixed(2)),
//   }

//   localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart))

//   return updatedCart
// }

// const getUpdatedProducts = (
//   existingProductCart,
//   product,
//   qtyToBeAdded,
//   newQty
// ) => {
//   const productExistIndex = isProductInCart(
//     existingProductCart,
//     product.databaseId
//   )
//   if (productExistIndex !== -1) {
//     let updatedProducts = existingProductCart
//     let updatedProduct = updatedProducts[productExistIndex]
//     updatedProduct.qty = newQty
//       ? parseInt(newQty)
//       : parseInt(updatedProduct.qty + qtyToBeAdded)
//     updatedProduct.totalPrice = parseFloat(
//       (updatedProduct.price * updatedProduct.qty).toFixed(2)
//     )

//     return updatedProducts
//   } else {
//     let productPrice = getFloatVal(product.price)
//     const newProduct = createNewProduct(product, productPrice, qtyToBeAdded)
//     existingProductCart.push(newProduct)
//     return existingProductCart
//   }
// }

// const isProductInCart = (existingProductCart, databaseId) => {
//   const returnItemThatExist = (item, index) => {
//     if (databaseId === item.databaseId) {
//       return item
//     }
//   }
//   const newArr = existingProductCart.filter(returnItemThatExist)
//   return existingProductCart.indexOf(newArr[0])
// }

// const createNewProduct = (
//   product: ProductPropsFunc,
//   productPrice: number,
//   qty: number
// ) => {
//   return {
//     databaseId: product.databaseId,
//     image: product.image,
//     name: product.name,
//     price: productPrice,
//     qty,
//     totalPrice: productPrice * qty,
//     productSlug: product.slug,
//     productCategorySlug:
//       //@ts-ignore
//       product.categorySlug || product.productCategories.edges[0].node.slug,
//   }
// }

// const removeItemFromCart = (databaseId) => {
//   const existinCart = localStorage.getItem('woo-next-cart')
//   const existinCartParse = JSON.parse(existinCart)
//   if (existinCartParse.products.length === 1) {
//     localStorage.removeItem('woo-next-cart')
//     return null
//   }

//   const productExistIndex = isProductInCart(
//     existinCartParse.products,
//     databaseId
//   )

//   if (productExistIndex !== -1) {
//     const productToBeRemoved = existinCartParse.products[productExistIndex]
//     const qtyToBeRemovedFromTotal = productToBeRemoved.qty
//     const priceToBeDeductedFromTotal = productToBeRemoved.totalPrice
//     const updatedCart = existinCartParse

//     updatedCart.products.splice(productExistIndex, 1)

//     updatedCart.totalProductCount =
//       updatedCart.totalProductCount - qtyToBeRemovedFromTotal

//     updatedCart.totalProductPrice =
//       updatedCart.totalProductPrice - priceToBeDeductedFromTotal

//     updatedCart.totalProductPrice = parseFloat(
//       updatedCart.totalProductPrice.toFixed(2)
//     )

//     localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart))

//     return updatedCart
//   } else {
//     return existinCartParse
//   }
// }

export {
  //getFloatVal,
  //addFirstProduct,
  //updateCart,
  //isProductInCart,
  //removeItemFromCart,
  getUpdatedItems,
  getFormattedCart,
}
