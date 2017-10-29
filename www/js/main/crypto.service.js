angular.module('clockworkproxy')
.service('Crypto', function () {

  this.generateKeyPair = function () {
    return KEYUTIL.generateKeypair('RSA', 1024);
  };

  this.getKeyFromPEM = function (pem) {
    return KEYUTIL.getKey(pem);
  };

  this.getPublicKeyPEM = function (key) {
    return KEYUTIL.getPEM(key);
  };

  this.getPrivateKeyPEM = function (key) {
    return KEYUTIL.getPEM(key, 'PKCS8PRV');
  };

});
