//https://gywbd.github.io/posts/2014/11/using-exports-nodejs-interface-design-pattern.html
var path = require("path");

//var env = process.env.NODE_ENV || "development";
var env = process.env.NODE_ENV || "test";
//var env = process.env.NODE_ENV || "production";
//var env = process.env.NODE_ENV || "heroku";

//自動切換env------------------20180121
var options = process.argv;
console.log(process.argv)

if (options.length >= 2 && options[2] === 'test') {
    env = process.env.NODE_ENV || "test";
}
if (options.length >= 2 && options[2] === 'dev') {
    env = process.env.NODE_ENV || "development";
}
if (options.length >= 2 && options[2] === 'prd') {
    env = process.env.NODE_ENV || "production";
}

var _posgURL = require(path.join(__dirname, '..', 'config', 'posg.json'))[env];
var _port = require(path.join(__dirname, '..', 'config', 'port.json'))[env];

module.exports = function () {

    var ConfigSettingWork = {

        env: function(){
            return env;
        },
        posgURL: function () {
            //console.log('hi hello')
            return _posgURL;
        },
        port: function () {
            //console.log('hi hello')
            return _port;
        }
    }

    return ConfigSettingWork;

};