const oneport = require('../');

console.time('time');
oneport(function (err, port) {
  console.log(port);
  console.timeEnd('time');
});