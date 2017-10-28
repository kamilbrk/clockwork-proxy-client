angular.module('clockworkproxy')
.service('Crypto', function () {

  this.generateKeyPair = function () {
    var rsaKeypair = KEYUTIL.generateKeypair('RSA', 1024);
    // associative array of keypair which has prvKeyObj and pubKeyObj parameters
    console.log('keypair', rsaKeypair);
  }
});
