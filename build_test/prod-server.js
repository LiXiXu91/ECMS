var opn = require('opn')
var path = require('path')
var express = require('express')

// default port where dev server listens for incoming traffic
var port =8082 //process.env.PORT || config.dev.port

var app = express()
var dist= path.join(__dirname,'../dist_web');
app.use("/",express.static(dist));
app.listen(port,function(){
  opn('http://localhost:8082');
});
