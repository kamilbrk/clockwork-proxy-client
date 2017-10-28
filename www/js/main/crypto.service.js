angular.module('clockworkproxy')
.service('Crypto', function () {

  this.generateKeyPair = function () {
    return KEYUTIL.generateKeypair('RSA', 1024);
  };

  this.getPem = function (key) {
    return KEYUTIL.getPEM(key);
  };

});
