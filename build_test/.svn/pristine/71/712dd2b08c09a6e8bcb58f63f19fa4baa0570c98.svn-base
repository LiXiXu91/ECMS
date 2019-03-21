require('./check-versions')()

//process.env.NODE_ENV = 'production'
const fs=require('fs');
var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

/*var  configfile=fs.readFileSync('src/common/config.js',{encoding:'utf8'});
let fileConf=`const path = require('path')
const Config = {
    HOST:"test.iwujie.cc"
    ,HOST_SOCKET:"test-baoz.iwujie.cc" 
    ,ADMIN_HOST:'test-admin.iwujie.cc'
}
module.exports = Config.default = Config`
fs.writeFileSync('src/common/config.js',fileConf,{encoding:'utf8'})*/


var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build_test.assetsRoot, config.build_test.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    //  fs.writeFileSync('src/common/config.js',configfile,{encoding:'utf8'})
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening main.html over file:// won\'t work.\n'
    ))
  })
})
