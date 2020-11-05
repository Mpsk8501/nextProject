import gql from 'graphql-tag'
import { GetServerSideProps, InferGetStaticPropsType } from 'next'
import client from '../../ApolloClient'
import ShopComponent from '../../components/shopComponents'
import { ShopLayout } from '../../layouts/shopLayout'

const Category = ({
  categoryGoods,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
  const goodsArr = categoryGoods.products.edges.map((item) => item.node)
  console.log(goodsArr)
  return (
    <ShopLayout>
      <ShopComponent title={categoryGoods.name} data={goodsArr} />
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  //@ts-ignore
  const id = params.category ? parseInt(params.category.split('-').pop()) : ''

  const CATEGORY_QUERY = gql`
    query {
      productCategory(id: ${id}, idType: DATABASE_ID) {
        name
        products {
          edges {
            node {
              slug
              databaseId
              name
              ... on SimpleProduct {
                price
              }
              image {
                sourceUrl
              }
            }
          }
        }
      }
    }`

  const result = await client.query({
    query: CATEGORY_QUERY,
  })

  return {
    props: { categoryGoods: result.data.productCategory },
  }
}

export default Category
