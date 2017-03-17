const webpack = require('webpack')
const base = require('./webpack.base.config')
const HTMLPlugin = require('html-webpack-plugin')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')

const config = merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HTMLPlugin({
      filename: '_index.html',
      template: 'build/template.html'
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new SWPrecachePlugin({
      cacheId: 'vue-ssr-template',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    })
  )
}

module.exports = config
