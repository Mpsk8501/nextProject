import { GetStaticProps, InferGetStaticPropsType } from 'next'
import client from '../../../components/ApolloClient'
import { ShopLayout } from '../../../components/layouts/shopLayout'
import CategoryComponent from '../../../components/categorycomponent'
import { CATEGORIES_QUERY } from '../../../queries/categories'

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
    query: CATEGORIES_QUERY,
  })

  return {
    props: { categories: result.data.productCategories.nodes },
    revalidate: 100,
  }
}

export default CategoryPage
