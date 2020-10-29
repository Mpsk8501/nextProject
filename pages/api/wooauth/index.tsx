const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default
import { NextApiRequest, NextApiResponse } from 'next'

const WooCommerce = new WooCommerceRestApi({
  url: 'http://wp-test',
  consumerKey: 'ck_378f906f8fa9a2aa7334ffe041d20d550b301a0a',
  consumerSecret: 'cs_3e28993fb5c887f2f9f9927f6966004b1b11d146',
  version: 'wc/v3',
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('skdjldj')
  const productsList = {}
  console.log(req.query.id)
  if (req.query.id) {
    const data = {
      name: 'Premium Quality',
      type: 'simple',
      regular_price: '21.99',
      description:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.',
      short_description:
        'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
    }

    await WooCommerce.post('products', data)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  } else {
    await WooCommerce.get('products')
      .then((response) => {
        response.data.map((item) => {
          productsList[item.id] = item.name
        })
        //console.log(response)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  res.status(200).json(productsList)
}
