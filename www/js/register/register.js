angular.module('clockworkproxy')

.controller('RegisterCtrl', function (Crypto, SmsService) {
  var keyPair = Crypto.generateKeyPair();
  var pem = Crypto.getPem(keyPair.pubKeyObj);

  console.log('Key pair', keyPair);
  console.log('PEM', pem);

  console.log('SMS service', SmsService);

  SmsService.startReception();

  this.send = function () {
    SmsService.send('way she goes boys');
  };

});
