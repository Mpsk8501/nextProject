import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import client from '../../../ApolloClient'
import SingleProductComponent from '../../../components/shopComponents/singleProductComponent '
import { ShopLayout } from '../../../layouts/shopLayout'
import gql from 'graphql-tag'

const SingleProductPage: InferGetStaticPropsType<typeof getStaticProps> = ({
  product,
}) => {
  return (
    <ShopLayout>
      <SingleProductComponent product={product} />
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const PRODUCTS_SLUG_QUERY = gql`
    query {
      products {
        nodes {
          productCategories {
            nodes {
              slug
            }
          }
          slug
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
        category: `${item.productCategories.nodes[0].slug}`,
        slug: `${item.slug}`,
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
  const id = params.slug ? params.slug : ''
  console.log(id)
  const slug = `"${id}"`

  const PRODUCT_QUERY = gql`
  query {
    product(id: ${slug}, idType: SLUG) {
      name
      image {
        id
        sourceUrl
      }
      description
      ... on SimpleProduct {
        price
      }
    }
  }
`

  const result = await client.query({
    query: PRODUCT_QUERY,
  })

  return {
    props: { product: result.data.product },
    revalidate: 100,
  }
}

export default SingleProductPage
