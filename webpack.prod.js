/**
 *
 * @type {webpack}
 */
const webpack = require('webpack')
const moment = require('moment')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const context = '/wechat-web'

process.env.NODE_ENV = 'production'

module.exports = {
  entry: {
    'index': './js/index.js',
    'post': './js/post.js',
    'add_record': "./js/add_record.js",
    'amend_record':"./js/amend_record.js",
    'antivirus':'./js/antivirus.js',
    'basic_info':'./js/basic_info.js',
    'bind_doctor':'./js/bind_doctor.js',
    'resetPS':'./js/resetPS.js',
    'giveBirth_info':'./js/giveBirth_info.js',
    'inoculate':'./js/inoculate.js',
    'pregnant_info':'./js/pregnant_info.js',
    'register':'./js/register.js',
    'supplementary_info':'./js/supplementary_info.js',
    'laboratorySheet':'./js/laboratorySheet.js'
  },
  output: {
    path: __dirname + '/build/',
    filename: '[name]' + '.min.js',
    publicPath: `${context}/wechat/prod/`,
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/
      },
      {test: /\.(ts|tsx)$/, loaders: ['babel-loader?cacheDirectory', 'awesome-typescript-loader?useCache']},
      {test: /\.less$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'less-loader']})},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'sass-loader']})},
      {test: /\.(jpg|png|svg)$/, loader: 'url-loader?limit=8192'},
      {test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/, loader: 'file-loader'},
      {
        test:/\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name]' + '.min.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    })
  ]
}
