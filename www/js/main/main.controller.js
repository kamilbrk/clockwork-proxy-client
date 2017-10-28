angular.module('clockworkproxy')

.controller('AppCtrl', function($scope, $ionicModal, $state, $timeout, Keys, Crypto) {

  var privateKey = Keys.getMyPrivateKey();
  var publicKey = Keys.getMyPublicKey();

  if (!privateKey || !publicKey) {
    console.log('no keys');
    $state.go('app.register');
  } else {
    console.log('keys set in ls!');
  }
});
