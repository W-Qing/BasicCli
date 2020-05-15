const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    // 打包输出目录，必须使用绝对地址，输出文件夹路径
    path: path.resolve(__dirname, 'dist'), // 解析路径为 ./dist
    // 入口 js 的打包输出文件名，默认为 main.js
    filename: 'bundle.js',
  },
  mode: 'development', // 在这里更改了模式，就不必在package.json里再设置 --mode
  resolve: {}, // 配置解析：配置别名、extensions 自动解析确定的扩展等等
  devServer: {
    contentBase: './dist', // web server 服务器的根路径
    open: 'true', // 等于 --open
    port: '8088', // 服务器端口号
    // proxy: {
    //   '/api': 'http://localhost:3000', // 配置代理
    // },
  }, // 开发服务器：run dev/start 的配置，如端口、proxy等
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        include: [path.resolve(__dirname, 'src')],
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  }, // 模块配置：配置loader（处理非 JavaScript 文件，比如 jsx、sass、vue、图片等等）
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunksSortMode: 'none',
    }),
  ], // 插件配置：打包优化、资源管理和注入环境变量
}
