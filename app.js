var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var cool = require('cool-ascii-faces');
var favicon = require('serve-favicon'); //--------add on 161124
var app = express();
var bodyparser = require('body-parser');
var path = require('path');

var moment = require('moment');

//log4js---------------20180124
var logger = require('./logConfig').logger('./app', 'dubug');

app.use(bodyparser.urlencoded({
  extended: true,
  limit: 1024 * 1024 * 20
}));
app.use(bodyparser.json({
  limit: 1024 * 1024 * 20
}));

// http://stackoverflow.com/questions/24433733/learning-node-express-public-folde
// r-not-working public folders app.use("/public",
// express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use('/logs', express.static(path.join(__dirname, 'logs'))); //add on 20180520

app.set('views', path.join(__dirname, 'views')); //設計頁面模板位置，在views子目錄下
app.set('view engine', 'ejs'); //表明要使用的模板引擎
app.use(expressLayouts);
//app.set("layoutextractScripts", true)

var route_init = require('./routes/route_init');
var route_error = require('./routes/route_error');
var test = require('./routes/test');
var index = require('./routes/index');
var home = require('./routes/home');
var posg = require('./routes/posg');
var account = require('./routes/account');
var member = require('./routes/member');
var random = require('./routes/random');
//var cool = require('./routes/cool');
var callposg = require('./routes/callposg');
var admin = require('./routes/admin');
var logs = require('./routes/logs'); //add on 20180520
var vendor = require('./routes/vendor'); //modify on 20181020
var view = require('./routes/view');
var product = require('./routes/product');
var category = require('./routes/category');
var shipment = require('./routes/shipment');

app.use(route_init); //on init router
app.use('/', home);
app.use('/test', test);
app.use('/index', index);
app.use('/home', home);
app.use('/posg', posg);
app.use('/account', account);
app.use('/member', member);
app.use('/random', random);
//app.use('/cool', cool);
app.use('/callposg', callposg);
app.use('/admin', admin);
app.use('/logs', logs); //add on 20180520
app.use('/vendor', vendor); //add on 20180520
app.use('/view', view);
app.use('/product', product); //20181016
app.use('/category', category); //20181016
app.use('/shipment', shipment); //20181016

app.use(route_error);

module.exports = app;
