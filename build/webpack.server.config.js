const webpack = require('webpack')
const merge = require('webpack-merge')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const base = require('./webpack.base.config')

module.exports = merge(base, {
  target: 'node',
  entry: './src/server.js',
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRPlugin()
  ]
})
