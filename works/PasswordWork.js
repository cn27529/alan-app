//https://www.hacksparrow.com/base64-encoding-decoding-in-node-js.html

module.exports = function() {
  var PasswordWork = {
    encode: function(value_str) {
      var e = new Buffer(value_str);
      var encode_str = e.toString('base64');
      return encode_str;
    },
    decode: function(value_str) {
      var d = new Buffer(value_str, 'base64');
      var decode_str = d.toString();
      return decode_str;
    },
    defaultPassword: function(isEncode) {
      var val = '123456';
      if (isEncode) return this.encode(val);
      else return val;
    }
  };

  return PasswordWork;
};
