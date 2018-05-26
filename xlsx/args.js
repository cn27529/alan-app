// print process.argv
// process.argv.forEach(function (val, index, array) {
//   console.log(index + ': ' + val);
// });

var myargs = function () {

  const args = process.argv;
  //console.log(args);
  //console.log(args.length);
  var args_len = args.length;

  this.isok = false;
  this.msg = '';
  this.filename = '';

  if (args_len !== 3) {
    //console.log('沒有指定檔案名稱, 例: node xlsx.js 檔案名稱.xlsx');
    this.msg = '沒有指定檔案名稱, 例: node xlsx.js 檔案名稱.xlsx';
  }
  else {
    this.isok = true;
    //console.log('檔案名稱: ' + args[2]);
    this.msg = '檔案名稱: ' + args[2];
    this.filename = args[2];
  }


}

module.exports = myargs;
