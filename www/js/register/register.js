angular.module('clockworkproxy')

.controller('RegisterCtrl', function (Crypto, SMS) {
  var keyPair = Crypto.generateKeyPair();
  var pem = Crypto.getPem(keyPair.pubKeyObj);

  console.log('Key pair', keyPair);
  console.log('PEM', pem);

  console.log('SMS service', SMS);
});
