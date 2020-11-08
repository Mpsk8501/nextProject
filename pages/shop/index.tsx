import { GetStaticProps, InferGetStaticPropsType } from 'next'
import client from '../../components/ApolloClient'
import { ShopLayout } from '../../components/layouts/shopLayout'
import ShopMainPageComponent from '../../components/shopMainPageComponent'
import { PRODUCTS_QUERY_BY_TAG } from '../../queries/products'

const CategoryPage = ({
  newProducts,
  saleProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ShopLayout>
      <ShopMainPageComponent
        saleProducts={saleProducts}
        newProducts={newProducts}
        title={'Shop main page'}
      />
    </ShopLayout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const getProducts = async (id) => {
    const result = await client.query({
      query: PRODUCTS_QUERY_BY_TAG,
      variables: { id },
    })
    console.log(result)

    return result.data.productTag.products.nodes.map((product) => {
      return {
        databaseId: product.databaseId,
        slug: product.slug,
        name: product.name,
        image: product.image,
        price: product.price,
        description: product.description,
        categorySlug: product.productCategories.edges[0].node.slug,
      }
    })
  }

  const newProducts = await getProducts('new')
  const saleProducts = await getProducts('sale')

  return {
    props: { newProducts, saleProducts },
    revalidate: 100,
  }
}

export default CategoryPage
