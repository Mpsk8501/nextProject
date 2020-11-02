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
  slug: string
  description?: string
}

export type { ProductProps, ProductPropsFunc }
