const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//import px2rem from 'postcss-plugin-px2rem';
const px2rem = require('postcss-plugin-px2rem')
const px2remOpts = {
  rootValue: 100,
  unitPrecision: 5,
  propWhiteList: [],
  propBlackList: [],
  selectorBlackList: [],
  ignoreIdentifier: false,
  replace: true,
  mediaQuery: false,
  minPixelValue: 0
}; 


module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件 
  // “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
  output: {
    path: __dirname + "/build",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true//实时刷新
  },
  module: {
    rules: [
        {
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        "es2015", "react"
                    ]
                }
            },
            exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
              {
                  loader: "style-loader"
              }, {
                  loader: "css-loader",
                  options: {
                    modules: true
                  }
              }, {
                loader: "postcss-loader",
                options: {
                  postcss: [px2rem(px2remOpts)],
                }
              },
          ],
        }
    ]
  },

  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
  ]
}