import { NextApiRequest, NextApiResponse } from 'next'
import WooCommerce from './wooCommercePlugin'

const data = {
  email: 'john.doe@example2.com',
  first_name: 'John2',
  last_name: 'Doe2',
  username: 'john.doe2',
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('sss', process.env.WP_URL)

  const productsList = {}
  if (req.query.id === 'createUser') {
    const customers = await WooCommerce.post('customers', data)
    console.log(customers.data)
    res.status(200).json(customers.data)
    return
  } else {
    const products = await WooCommerce.get('products')
    products.data.map((item) => {
      productsList[item.id] = item.name
    })
  }

  res.status(200).json(productsList)
}
