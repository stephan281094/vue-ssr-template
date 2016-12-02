const webpack = require('webpack')
const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')

const config = Object.assign({}, base, {
  plugins: base.plugins.concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js'
    })
  ])
})

if (process.env.NODE_ENV === 'production') {
  const ExtractTextPlugin = require('extract-text-webpack-plugin')

  vueConfig.loaders = {
    sass: ExtractTextPlugin.extract({
      loader: 'css-loader!sass-loader',
      fallbackLoader: 'vue-style-loader'
    })
  }

  config.plugins.push(
    new ExtractTextPlugin('styles.css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = config
