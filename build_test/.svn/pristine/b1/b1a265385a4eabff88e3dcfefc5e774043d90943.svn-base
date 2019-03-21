var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')


/*var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('css/[name].css?[contenthash]')
var cssLoader = extractCSS.extract(['css'])
var sassLoader = extractCSS.extract(['css', 'sass'])*/




function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  /*entry: {
    app: './src/main.js'
  },*/
  entry: utils.getEntries(resolve('src/module/**/*.js')),
  output: {
    path: config.build_test.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build_test.assetsPublicPath
      : config.dev.assetsPublicPath
 /*   , library: 'iview',       // 模块名称
    libraryTarget: 'umd',   // 输出格式
    umdNamedDefine: true    // 是否将模块名称作为 AMD 输出的命名空间*/
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      /*{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },*/
      /*{test: /\.css$/, loader: cssLoader},
      {test: /\.scss$/, loader: sassLoader},*/
      /*{
        test: /\.css$/,
        //配置css的抽取器、加载器。'-loader'可以省去
        use: extractCSS.extract({ fallback: 'style-loader', use: 'css-loader' })
      }, {
        test: /\.less$/,
        //配置less的抽取器、加载器。中间!有必要解释一下，
        //根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
        //你也可以开发自己的loader哟。有关loader的写法可自行谷歌之。
        use: extractLESS.extract('css-loader!less-loader')
      },*/
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader', exclude: /node_modules/,
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
          ,name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
       ,{ test: /\.tsx?$/, use: "ts-loader" }
    ]
  }
  , plugins: [

    //,extractCSS
   // ,'vux-ui'
  ]
}
