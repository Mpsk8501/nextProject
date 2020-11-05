import { GetStaticProps, InferGetStaticPropsType } from 'next'
import client from '../../ApolloClient'
import { ShopLayout } from '../../layouts/shopLayout'
import gql from 'graphql-tag'
import CategoryComponent from '../../components/categorycomponent'

const CATEGORY_QUERY = gql`
  query {
    productCategories {
      nodes {
        databaseId
        slug
        name
        image {
          sourceUrl
        }
      }
    }
  }
`

const CategoryPage = ({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ShopLayout>
      <CategoryComponent data={categories} />
    </ShopLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const result = await client.query({
    query: CATEGORY_QUERY,
  })

  return {
    props: { categories: result.data.productCategories.nodes },
    revalidate: 100,
  }
}

export default CategoryPage
