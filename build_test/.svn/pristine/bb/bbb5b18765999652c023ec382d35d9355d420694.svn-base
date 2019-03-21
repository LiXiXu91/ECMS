var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var PrerenderSpaPlugin = require('prerender-spa-plugin')

var env = config.build_test.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build_test.productionSourceMap,
      extract: false
    })
  },
  devtool: config.build_test.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build_test.assetsRoot,
    publicPath: "./",
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    // generate dist main.html with correct asset hash for caching.
    // you can customize output by editing /main.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    /*new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'main.html'
        : config.build_test.index,
      template: 'main.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),*/
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build_test.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build_test.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build_test.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build_test.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}



var pages = utils.getEntries(path.join(__dirname, '..','src/module/**/*.html'))
for(var page in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: page + '.html',
    template: pages[page], //模板路径
    inject: true,
    favicon:'src/assets/favicon.ico',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    },
    // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    chunksSortMode: 'dependency',
    // excludeChunks 允许跳过某些chunks, 而chunks告诉插件要引用entry里面的哪几个入口
    // 如何更好的理解这块呢？举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己所需的js，
    // 而不是每个页面都引入所有的js，你可以把下面这个excludeChunks去掉，然后npm run build_web，然后看编译出来的index.html和about.html就知道了
    // filter：将数据过滤，然后返回符合要求的数据，Object.keys是获取JSON对象中的每个key
    excludeChunks: Object.keys(pages).filter(item => {
      return (item != page)
    })
  }
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}
/*webpackConfig.plugins.push(new PrerenderSpaPlugin(
  // (REQUIRED) Absolute path to static root
  config.build_test.assetsRoot,
  // (REQUIRED) List of routes to prerender
  [ '/','/Question']
  // (OPTIONAL) Options
  ,{
    // NOTE: Unless you are relying on asynchronously rendered content,
    // such as after an Ajax request, none of these options should be
    // necessary. All synchronous scripts are already executed before
    // capturing the page content.

    // Wait until a specific event is fired on the document.
    captureAfterDocumentEvent: 'custom-post-render-event',
    // This is how you would trigger this example event:
    // document.dispatchEvent(new Event('custom-post-render-event'))

    // Wait until a specific element is detected with
    // document.querySelector.
    captureAfterElementExists: '#content',

    // Wait until a number of milliseconds has passed after scripts
    // have been executed. It's important to note that this may
    // produce unreliable results when relying on network
    // communication or other operations with highly variable timing.
    captureAfterTime: 5000,

    // NOTE: You can even combine strategies if you like. For example,
    // if you only _sometimes_ want to wait for an event to fire, you
    // can create a timeout by combining captureAfterTime with
    // captureAfterDocumentEvent. When combining strategies, page
    // content will be captured after the first triggered strategy.

    // Instead of loudly failing on JS errors (the default), ignore them.
    ignoreJSErrors: true,

    // Because PhantomJS occasionally runs into an intermittent issue,
    // we will retry a page capture up to 10 times by default. You may
    // raise or lower this limit if you wish.
    maxAttempts: 10,

    // Prevent PhantomJS from navigating away from the URL passed to it
    // and prevent loading embedded iframes (e.g. Disqus and Soundcloud
    // embeds), which are not ideal for SEO and may introduce JS errors.
    navigationLocked: true,

    // The options below expose configuration options for PhantomJS,
    // for the rare case that you need special settings for specific
    // systems or applications.

    // http://phantomjs.org/api/command-line.html#command-line-options
    phantomOptions: '--disk-cache=true',

    // http://phantomjs.org/api/webpage/property/settings.html
    phantomPageSettings: {
      loadImages: true
    },

    // Manually transform the HTML for each page after prerendering,
    // for example to set the page title and metadata in edge cases
    // where you cannot handle this via your routing solution.
    //
    // The function's context argument contains two properties:
    //
    // - html :: the resulting HTML after prerendering)
    // - route :: the route currently being processed
    //            e.g. "/", "/about", or "/contact")
    //
    // Whatever is returned will be printed to the prerendered file.
    postProcessHtml: function (context) {
      var titles = {
        '/':'无界社群-多群转播|微信群转播|社群运营者的复合型直播平台',
        '/Question': '甘草群播-常见问题|多群转播|微信群转播|社群运营者的复合型直播平台',
      }
      return context.html.replace(
        /<title>[^<]*<\/title>/i,
        '<title>' + titles[context.route] + '</title>'
      )
    }
  }
))*/

module.exports = webpackConfig
