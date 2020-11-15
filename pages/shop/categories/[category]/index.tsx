import client from '../../../../components/ApolloClient'
import ShopComponent from '../../../../components/shopComponents'
import { ShopLayout } from '../../../../components/layouts/shopLayout'
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import { CATEGORY_SLUGS } from '../../../../queries/slugs'
import { PRODUCTS_QUERY_BY_CATEGORY } from '../../../../queries/products'

const Category: InferGetStaticPropsType<typeof getStaticProps> = ({
  categoryGoods,
  categoryName,
}) => {
  return (
    <ShopLayout>
      <ShopComponent title={categoryName} data={categoryGoods} />
    </ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await client.query({
    query: CATEGORY_SLUGS,
  })
  const paths = result.data.productCategories.nodes.map((item) => {
    return {
      params: {
        category: `${item.slug}`,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.category
  const result = await client.query({
    query: PRODUCTS_QUERY_BY_CATEGORY,
    variables: { id },
  })

  const newArrGoogs = [...result.data.productCategory.products.edges]
  const goods = newArrGoogs.map((item) => {
    return item.node
  })

  return {
    props: {
      categoryGoods: goods,
      categoryName: result.data.productCategory.name,
    },
  }
}

export default Category
