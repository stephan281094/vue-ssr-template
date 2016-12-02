const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/client/index.js',
    vendor: ['vue', 'vue-router', 'vuex', 'lru-cache', 'es6-promise']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'client.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: vueConfig
    })
  ]
}
