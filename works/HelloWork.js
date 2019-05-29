//https://gywbd.github.io/posts/2014/11/using-exports-nodejs-interface-design-pattern.html

// var Member = {
//     hello: function() {
//         console.log('hi hello')
//     },
//     hi: function() {
//         return "hi"
//     }
// }

// module.exports = Member;

module.exports = function() {
  var HelloWork = {
    hello: function() {
      console.log('hi hello');
    },
    hi: function() {
      return 'hi';
    }
  };

  return HelloWork;
};
