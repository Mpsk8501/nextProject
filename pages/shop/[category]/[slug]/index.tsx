import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import client from '../../../../components/ApolloClient'
import SingleProductComponent from '../../../../components/shopComponents/singleProductComponent '
import { ShopLayout } from '../../../../components/layouts/shopLayout'
import { PRODUCTS_CATEGORIES_SLUGS_QUERY } from '../../../../queries/slugs'
import { PRODUCT_QUERY_BY_SLUG } from '../../../../queries/products'

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
  const result = await client.query({
    query: PRODUCTS_CATEGORIES_SLUGS_QUERY,
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
  const id = params.slug
  const result = await client.query({
    query: PRODUCT_QUERY_BY_SLUG,
    variables: { id },
  })

  return {
    props: { product: result.data.product },
    revalidate: 100,
  }
}

export default SingleProductPage
