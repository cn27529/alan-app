//http://carlos-studio.com/2017/10/28/node-js-path-%E6%A8%A1%E7%B5%84-%E5%8F%96%E5%BE%97%E8%B7%AF%E5%BE%91%E4%B8%AD%E6%AA%94%E6%A1%88%E7%9A%84%E5%89%AF%E6%AA%94%E5%90%8D/

//var cool = require('cool-ascii-faces');
var fs = require('fs');
var path = require('path');
//category名字为inde.js 只收录warn以及以上权限信息
var logger = require('./logConfig').logger('./test-readdirSync', 'debug');
var uuid = require('uuid/v4');

var myFolder = './logs/';
var folderFiles = [];
folderFiles = getFolderFiles(myFolder);
var returnFiles = [];
returnFiles = getReturnFiles(folderFiles, myFolder);
console.log(folderFiles);
logger.info(folderFiles);

function getFolderFiles(myFolder) {
  //logger.info(req);
  //var returnFiles = [];
  //var myFolder = './logs/';
  var folderFiles = [];

  fs.readdirSync(myFolder).forEach(val => {
    //console.log(index, val);
    var path_a = myFolder; // other 是一個目錄
    var path_b = val; // other.txt 是一個存於 other 目錄裡的檔案
    var path_resolve = path.resolve(path_a, path_b); // 解析成絕對路徑
    //console.info(path_resolve);
    // 輸出內容：/Users/carlos/Documents/test/other/other.txt
    var extname = path.extname(path_resolve);
    //console.info(path.extname(path_resolve));

    //排除不要的副名
    if (extname.toLowerCase() === '.md') return false;
    folderFiles.push(val);
  });

  return folderFiles;
}

function getReturnFiles(folderFiles, myFolder) {
  var returnFiles = [];

  folderFiles.forEach(function(val, index, array) {
    //console.log(index, val);
    var path_a = myFolder; // other 是一個目錄
    var path_b = val; // other.txt 是一個存於 other 目錄裡的檔案
    var path_resolve = path.resolve(path_a, path_b); // 解析成絕對路徑
    //console.info(path_resolve);
    // 輸出內容：/Users/carlos/Documents/test/other/other.txt
    var extname = path.extname(path_resolve);

    //console.log(file);
    var myInfo = {
      fullpatn: path_resolve,
      extname: extname,
      name: val,
      id: uuid()
    };
    returnFiles.push(myInfo);
  });

  return returnFiles;
}

//console.log(files)
