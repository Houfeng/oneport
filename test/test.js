const oneport = require('../');
const utils = require('ntils');
const assert = require('assert');

describe('oneport', function () {

  it('save', function (done) {
    oneport.acquire(function (err, port) {
      if (err) throw err;
      assert.strictEqual(utils.isNumber(port), true);
      done();
    });
  });

  it('no save', function (done) {
    oneport.acquire('test', function (err, port1) {
      if (err) throw err;
      assert.strictEqual(utils.isNumber(port1), true);
      oneport.last('test', function (err, port2) {
        if (err) throw err;
        assert.strictEqual(port1, port2);
        done();
      });
    });
  });

});
