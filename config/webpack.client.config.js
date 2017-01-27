const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const path = require('path')
const ServiceWorkerPlugin = require('serviceworker-webpack-plugin')
const webpack = require('webpack')

const base = require('./webpack.base.config')
const vueConfig = require('./vue-loader.config')

const config = Object.assign({}, base, {
  plugins: (base.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HTMLPlugin({
      filename: '_index.html',
      template: 'config/template.html'
    })
  ])
})

if (process.env.NODE_ENV === 'production') {
  vueConfig.loaders = {
    scss: ExtractTextPlugin.extract({
      loader: 'css-loader!sass-loader',
      fallbackLoader: 'vue-style-loader'
    })
  }

  config.plugins.push(
    new ExtractTextPlugin('styles.[hash].css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ServiceWorkerPlugin({
      entry: path.join(__dirname, '../src/sw.js')
    })
  )
}

module.exports = config
