const path = require('path')
const webpack = require('webpack')

const ipAddress = 'localhost'
const port = 3000

module.exports = {
  entry: {
    'index': './js/index.js',
    'post': './js/post.js',
  },
  devServer: {
    hot: true,
    inline: true,
    host: ipAddress,
    port: port,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'http://' + ipAddress + ':' + port + '/static/'
  },
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"inline"'
    }),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/, loaders: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/
      },
      {test: /\.less$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'less-loader']},
      {test: /\.scss$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader']},
      {test: /\.(jpg|png|svg)$/, loader: 'url-loader?limit=8192'},
      {test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/, loader: 'file-loader'}
    ]
  }
}
