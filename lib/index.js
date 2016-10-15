const net = require('net');
const fs = require('fs');
const Class = require('cify');
const utils = require('ntils');
const os = require('os');

const EXTNAME = '.oneport';

const Oneport = new Class({

  constructor: function () {
    this.tmpdir = os.tmpdir() + '/';
  },

  /**
   * 获取监时路径
   *@param {string} name 指定一个名称
   */
  _getTmpPath: function (name) {
    return this.tmpdir + name + EXTNAME;
  },

  /**
   * 保存在到文件
   * @param {string} name 指定一个名称，可用于再次查询
   * @param {function} callback 回调
   * @returns {void} 无返回 
   */
  _saveToFile(name, port, callback) {
    if (utils.isNull(name)) return callback();
    fs.writeFile(this._getTmpPath(name), port, callback);
  },

  /**
   * 申请一个空闲的端口
   * @param {string} name 指定一个名称，可用于再次查询
   * @param {function} callback 回调
   * @returns {void} 无返回 
   */
  acquire: function (name, callback) {
    if (!utils.isFunction(callback)) {
      callback = [name, name = callback][0];
    }
    if (!utils.isFunction(callback)) {
      throw new Error('Invalid paraments');
    }
    const server = net.createServer();
    server.on('error', callback);
    server.on('listening', function () {
      var port = server.address().port;
      this._saveToFile(name, port, function (err) {
        if (err) return callback(err);
        server.close(function () {
          callback(null, port);
        });
      });
    }.bind(this));
    server.listen(0);
  },

  /**
   * 查询指定名称最后一个申请到的端口
   * @param {string} name 查询名称
   * @param {function} callback 回调
   * @returns {void} 无返回 
   */
  last: function (name, callback) {
    if (!utils.isString(name) || !utils.isFunction(callback)) {
      throw new Error('Invalid paraments');
    }
    fs.readFile(this._getTmpPath(name), function (err, buffer) {
      if (err) return callback(err);
      callback(null, Number(buffer.toString()));
    });
  }

});

module.exports = new Oneport();
module.exports.Oneport = Oneport;