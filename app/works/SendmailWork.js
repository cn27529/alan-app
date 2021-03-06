var validator = require('validator');

module.exports = function() {
  var SendmailWork = {
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
    },
    isEmail: function(value_str) {
      var val = value_str;
      return validator.isEmail(val);
    }
  };

  return SendmailWork;
};
