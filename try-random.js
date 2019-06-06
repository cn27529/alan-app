//https://blog.csdn.net/BillyWang2016/article/details/61195296
function randomString(len) {
  len = len || 32;
  var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var maxPos = $chars.length;
  var str = '';
  for (i = 0; i < len; i++) {
    //0~32的整数
    str += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));
  }
  return str;
}

//console.log(randomString(10));

function randomNumber() {
  const now = new Date();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  //month = this.setTimeDateFmt(month);
  //hour = this.setTimeDateFmt(hour);
  //minutes = this.setTimeDateFmt(minutes);
  //seconds = this.setTimeDateFmt(seconds);
  var str =
    //now.getFullYear().toString() +
    now.getFullYear() -
    2000 +
    month.toString() +
    day +
    hour +
    minutes +
    seconds +
    Math.round(Math.random() * 89 + 100).toString();

  return str;
}

console.log(randomNumber());
