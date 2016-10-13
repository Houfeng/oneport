const net = require('net');

module.exports = function (callback) {
  if (typeof callback !== 'function') return;
  const server = net.createServer();
  server.on('error', callback);
  server.on('listening', function () {
    var port = server.address().port;
    server.close(function () {
      callback(null, port);
    });
  });
  server.listen(0);
};