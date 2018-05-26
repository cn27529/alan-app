var fs = require('fs');

function filepath(file_path) {

    this.info = null;
    this.isok = false;
    this.msg = '';

    if (file_path) {
        init(file_path, this);
    }

    function init(file_path, me) {
        try {
            me.info = fs.statSync(file_path);
            me.isok = true;            
        } catch (ex) {
            me.isok = false;
            me.msg = '檔案不存在';
        }
    }

    this.setPath = function (file_path) {
        init(file_path, this);
    }

}

module.exports = filepath;

