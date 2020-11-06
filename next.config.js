module.exports = {
  // Uncomment the line below to enable basePath, pages and
  // redirects will then have a path prefix (`/app` in this case)
  //
  // basePath: '/app',

  async redirects() {
    return [
      {
        source: '/categories/:category',
        destination: '/:category',
        permanent: false,
      },
      {
        source: '/categories/:category/:slug',
        destination: '/:category/:slug',
        permanent: false,
      },
    ]
  },
}
