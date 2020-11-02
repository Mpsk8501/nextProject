import { ProductPropsFunc } from '../interfaces'

const getFloatVal = (string: string): number => {
  let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)

  if (floatValue[1]) {
    console.log('1', floatValue)

    //@ts-ignore
    floatValue = floatValue.join('')
    console.log('2', floatValue)
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
    totalCountCount: 1,
    totalProductPrice: getFloatVal(product.price),
  }

  const newProduct = createNewProduct(product, productPrice, 1)

  newCart.products.push(newProduct)
  localStorage.setItem('woo-next-cart', JSON.stringify(newCart))
  console.log(newCart)
}

const createNewProduct = (
  product: ProductPropsFunc,
  productPrice: number,
  qty: number
) => {
  return {
    productId: product.databaseId,
    image: product.image,
    name: product.name,
    price: productPrice,
    qty,
    totalPrice: (productPrice * qty).toFixed(2),
  }
}

export { getFloatVal, addFirstProduct, createNewProduct }
