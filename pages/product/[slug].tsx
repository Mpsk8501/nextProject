import { FC } from 'react'
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next'
import client from '../../ApolloClient'
import SingleProductComponent from '../../components/shopComponents'
import { ShopLayout } from '../../layouts/shopLayout'
import gql from 'graphql-tag'
import { useRouter } from 'next/router'

// const PRODUCT_QUERY = gql`
//   query {
//     products(first: 20) {
//       nodes {
//         id
//         name
//         slug
//         averageRating
//         image {
//           title
//           sourceUrl
//         }
//         databaseId
//         ... on SimpleProduct {
//           id
//           name
//           price
//         }
//       }
//     }
//   }
// `

const SingleProductPage: FC = () => {
  const router = useRouter()
  console.log(router)

  return (
    <ShopLayout>{/* <SingleProductComponent data={products} /> */}</ShopLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { slug: '21' } },
      { params: { slug: '20' } },
      { params: { slug: '11' } },
    ],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const id = params.slug ? parseInt(id.split('-').pop()) : ''
  console.log(id)
  return {}
}

export default SingleProductPage
