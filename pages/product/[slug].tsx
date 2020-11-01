import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import client from '../../ApolloClient'
import SingleProductComponent from '../../components/shopComponents/singleProductComponent '
import { ShopLayout } from '../../layouts/shopLayout'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

const SingleProductPage: InferGetStaticPropsType<typeof getStaticProps> = ({
  product,
}) => {
  //const router = useRouter()
  //console.log(router)

  return (
    <ShopLayout>
      <SingleProductComponent productData={product} />
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const PRODUCTS_SLUG_QUERY = gql`
    query {
      products {
        nodes {
          slug
          databaseId
        }
      }
    }
  `
  const result = await client.query({
    query: PRODUCTS_SLUG_QUERY,
  })
  const nodes = result.data.products.nodes
  const paths = nodes.map((item) => {
    return {
      params: {
        slug: `${item.slug}-${item.databaseId}`,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  //@ts-ignore
  const id = params.slug ? parseInt(params.slug.split('-').pop()) : ''

  const PRODUCT_QUERY = gql`
  query {
    product(id: "${id}", idType: DATABASE_ID) {
      name
      image {
        id
        sourceUrl
      }
      description
    }
  }
`

  const result = await client.query({
    query: PRODUCT_QUERY,
  })

  return {
    props: { product: result.data.product },
  }
}

export default SingleProductPage
