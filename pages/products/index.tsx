import { FC } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import client from '../../ApolloClient'
import ShopComponent from '../../components/shopComponents'
import { ShopLayout } from '../../layouts/shopLayout'
import gql from 'graphql-tag'

const PRODUCT_QUERY = gql`
  query {
    products {
      nodes {
        id
        name
        slug
        averageRating
        image {
          title
          sourceUrl
        }
        databaseId
        ... on SimpleProduct {
          id
          name
          price
        }
      }
    }
  }
`

const ProductsPage: FC = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ShopLayout>
      <ShopComponent data={products} />
    </ShopLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const result = await client.query({
    query: PRODUCT_QUERY,
  })

  return {
    props: { products: result.data.products.nodes },
  }
}

export default ProductsPage
