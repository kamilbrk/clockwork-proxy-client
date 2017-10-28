angular.module('clockworkproxy')

.controller('RegisterCtrl', function (Crypto) {
  console.log('reg ctrl');
  this.foo = 'bar';

  Crypto.generateKeyPair();
});
