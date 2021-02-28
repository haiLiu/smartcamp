module.exports = {
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