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

//http://stackoverflow.com/questions/24433733/learning-node-express-public-folder-not-working
//public folders
//app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/css", express.static(path.join(__dirname, 'public/css')));
app.use("/images", express.static(path.join(__dirname, 'public/images')));
app.use("/js", express.static(path.join(__dirname, 'public/js')));

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use("/logs", express.static(path.join(__dirname, 'logs'))); //add on 20180520

app.set('views', path.join(__dirname, 'views')); //設計頁面模板位置，在views子目錄下
app.set('view engine', 'ejs'); //表明要使用的模板引擎
app.use(expressLayouts);
//app.set("layoutextractScripts", true)

var account = require('./routes/account');
var member = require('./routes/member');
var random = require('./routes/random');
var index = require('./routes/index');
var posg = require('./routes/posg');
var cool = require('./routes/cool');
var callposg = require('./routes/callposg');
var admin = require('./routes/admin');
var logs = require('./routes/logs'); //add on 20180520
var vendor = require('./routes/vendor'); //add on 20180520
var view = require('./routes/view');
var product = require('./routes/product');
var category = require('./routes/category');

app.use('/', index);
app.use('/index', index);
app.use('/home', index);
app.use('/posg', posg);
app.use('/account', account);
app.use('/member', member);
app.use('/random', random);
app.use('/cool', cool);
app.use('/callposg', callposg);
app.use('/admin', admin);
app.use('/logs', logs); //add on 20180520
app.use('/vendor', vendor); //add on 20180520
app.use('/view', view);
app.use('/product', product); //20181016
app.use('/category', category); //20181016

// catch 404 and forward to error handler
app.use(function (err, req, res, next) {

    res.status(404);
    //next(err); res.render('error', {err: err});
    console.log(err);
    logger.error(err);
    res.end();

});

// error handler no stacktraces leaked to user unless in development environment
app.use(function (err, req, res, next) {

    logger.error(err);
    res.status(err.status || 500);
    res.json({
        msg: err.message,
        err: (app.get('env') === 'development') ?
            err :
            {}
    });

});

module.exports = app;