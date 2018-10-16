//https://gywbd.github.io/posts/2014/11/using-exports-nodejs-interface-design-pattern.html

var cool = require('cool-ascii-faces');
var fs = require('fs');
var uuid = require('uuid/v4');
var path = require('path');

var logpath = './works/FAFWork';
var logger = require('../logConfig').logger(logpath, 'debug');

module.exports = function () {

    var FAFWork = {
        
        getFolderFiles: function(myFolder) {

            var folderFiles = [];
        
            fs.readdirSync(myFolder).forEach(function (val) {
        
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
        
            //logger.info(folderFiles)
            return folderFiles;
        },
        
        getFilesizeInBytes: function(filename) {
            var stats = fs.statSync(filename);
            var fileSizeInBytes = stats["size"];
            return fileSizeInBytes;
        },
        
        getReturnFiles: function(folderFiles, myFolder) {
        
            var returnFiles = [];
            
            folderFiles.forEach(function (val, index, array) {
        
                //console.log(index, val);
                var path_a = myFolder; // other 是一個目錄
                var path_b = val; // other.txt 是一個存於 other 目錄裡的檔案
                var path_resolve = path.resolve(path_a, path_b); // 解析成絕對路徑
                //console.info(path_resolve);
                // 輸出內容：/Users/carlos/Documents/test/other/other.txt
                var extname = path.extname(path_resolve);
        
                //var fileSizeInBytes = getFilesizeInBytes(path_resolve);

                var stats = fs.statSync(path_resolve);
                var fileSizeInBytes = stats["size"];
        
                //console.log(file);
                var myInfo = {
                    mb: ((fileSizeInBytes / 1024) / 1024).toFixed(2),
                    kb: (fileSizeInBytes / 1024).toFixed(2),
                    bytes: fileSizeInBytes,
                    fullpatn: path_resolve,
                    extname: extname,
                    name: val,
                    id: uuid()
                };
                returnFiles.push(myInfo)
        
            });
        
            //logger.info(returnFiles);
        
            return returnFiles;
        
        }
        
    };

    return FAFWork;

};



