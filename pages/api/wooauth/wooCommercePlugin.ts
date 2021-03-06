const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WP_URL,
  consumerKey: process.env.WCconsumerKey,
  consumerSecret: process.env.WCconsumerSecret,
  version: 'wc/v3',
})

export default WooCommerce
