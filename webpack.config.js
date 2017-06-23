var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('css/[name].css?[contenthash]')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var sassLoader = extractCSS.extract(['css', 'sass?outputStyle=expanded', 'autoprefixer-loader?browsers=last 100 version',])

var getHtmlConfig = function (name) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}
var config = {
  entry: {
    'common': ['./src/page/global.js', 'webpack-dev-server/client?localhost:2017/'],
    'index': './src/page/index.js',
    'login': './src/page/login.js'
  },
  output: {
    path: './build',
    publicPath: '/build',
    filename: 'js/[name].js'
  },
  externals: {
    jquery: "window.jQuery"
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: sassLoader
        // 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer-loader?browsers=last 2 version!sass-loader?outputStyle=expanded&sourceMap'
      },
      {
        test: /\.(png|jpg|gif|woff|svg|eot|ttf)$/,
        loader: 'url-loader?limit=1000&name=resource/[name].[ext]'
      }
    ]
  },
  plugins: [
    // 独立通用模块到base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    //分离样式文件
    extractCSS,
    //压缩代码
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // html模板处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))
  ]
}

module.exports = config