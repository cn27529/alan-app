var options = process.argv;
//console.log(process.argv)

// print process.argv
process.argv.forEach(function(val, index, array) {
  console.log(index, val);
});
