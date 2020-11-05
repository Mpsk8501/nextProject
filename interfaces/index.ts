interface ProductProps {
  product: {
    name: string
    image: {
      sourceUrl: string
    }
    price: string
    databaseId: number
    slug: string
    description?: string
  }
}
interface ProductPropsFunc {
  name: string
  image: {
    sourceUrl: string
  }
  price: string
  databaseId: number
  slug?: string
  description?: string
}

interface CartItemProps {
  cartItem: {
    name: string
    image: {
      sourceUrl: string
    }
    price: number
    databaseId: number
    qty: number
    totalPrice: number
  }
  setCart: () => void
}

export type { ProductProps, ProductPropsFunc, CartItemProps }
