import { ProductPropsFunc } from '../interfaces'

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

const addFirstProduct = (product: ProductPropsFunc) => {
  const productPrice = getFloatVal(product.price)
  const newCart = {
    products: [],
    totalProductCount: 1,
    totalProductPrice: getFloatVal(product.price),
  }
  const newProduct = createNewProduct(product, productPrice, 1)
  newCart.products.push(newProduct)
  localStorage.setItem('woo-next-cart', JSON.stringify(newCart))
  console.log(newCart)
  return newCart
}

const updateCart = (
  product: ProductPropsFunc,
  existCart,
  qtyToBeAdded,
  newQty = false
) => {
  const updatedProducts = getUpdatedProducts(
    existCart.products,
    product,
    qtyToBeAdded,
    newQty
  )

  const addPrice = (total, item) => {
    total.totalPrice += +item.totalPrice
    total.qty += item.qty

    return total
  }

  const total = updatedProducts.reduce(addPrice, { totalPrice: 0, qty: 0 })

  const updatedCart = {
    products: updatedProducts,
    totalProductCount: parseInt(total.qty),
    totalProductPrice: parseFloat(parseFloat(total.totalPrice).toFixed(2)),
  }

  localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart))

  return updatedCart
}

const getUpdatedProducts = (
  existingProductCart,
  product,
  qtyToBeAdded,
  newQty
) => {
  const productExistIndex = isProductInCart(
    existingProductCart,
    product.databaseId
  )
  if (productExistIndex !== -1) {
    let updatedProducts = existingProductCart
    let updatedProduct = updatedProducts[productExistIndex]
    updatedProduct.qty = newQty
      ? parseInt(newQty)
      : parseInt(updatedProduct.qty + qtyToBeAdded)
    updatedProduct.totalPrice = parseFloat(
      (updatedProduct.price * updatedProduct.qty).toFixed(2)
    )

    return updatedProducts
  } else {
    let productPrice = getFloatVal(product.price)
    const newProduct = createNewProduct(product, productPrice, qtyToBeAdded)
    existingProductCart.push(newProduct)
    return existingProductCart
  }
}

const isProductInCart = (existingProductCart, databaseId) => {
  const returnItemThatExist = (item, index) => {
    if (databaseId === item.databaseId) {
      return item
    }
  }
  const newArr = existingProductCart.filter(returnItemThatExist)
  return existingProductCart.indexOf(newArr[0])
}

const createNewProduct = (
  product: ProductPropsFunc,
  productPrice: number,
  qty: number
) => {
  return {
    databaseId: product.databaseId,
    image: product.image,
    name: product.name,
    price: productPrice,
    qty,
    totalPrice: productPrice * qty,
  }
}

const removeItemFromCart = (databaseId) => {
  const existinCart = localStorage.getItem('woo-next-cart')
  const existinCartParse = JSON.parse(existinCart)
  if (existinCartParse.products.length === 1) {
    localStorage.removeItem('woo-next-cart')
    return null
  }

  const productExistIndex = isProductInCart(
    existinCartParse.products,
    databaseId
  )
  console.log(productExistIndex)

  if (productExistIndex !== -1) {
    const productToBeRemoved = existinCartParse.products[productExistIndex]
    const qtyToBeRemovedFromTotal = productToBeRemoved.qty
    const priceToBeDeductedFromTotal = productToBeRemoved.totalPrice
    const updatedCart = existinCartParse

    updatedCart.products.splice(productExistIndex, 1)

    updatedCart.totalProductCount =
      updatedCart.totalProductCount - qtyToBeRemovedFromTotal

    updatedCart.totalProductPrice =
      updatedCart.totalProductPrice - priceToBeDeductedFromTotal

    updatedCart.totalProductPrice = parseFloat(
      updatedCart.totalProductPrice.toFixed(2)
    )

    localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart))

    return updatedCart
  } else {
    return existinCartParse
  }
}

export {
  getFloatVal,
  addFirstProduct,
  updateCart,
  isProductInCart,
  removeItemFromCart,
}
