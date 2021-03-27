const proxyObj = {}
proxyObj['/'] = {
  target: 'https://jsonplaceholder.typicode.com/posts/',
  changeOrigin: true,
  pathRewrite: {
    '^/': ''
  }
}
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'network': '@/network',
        'components': '@/components',
        'views': '@/views',
      }
    }
  },
  rules: [
    {
      test: /\.less$/,
      loader: "style-loader!css-loader!less-loader",
    }
  ]
}