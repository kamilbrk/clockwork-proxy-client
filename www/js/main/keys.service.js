angular.module('clockworkproxy')
.service('Keys', function (store) {

  this.setPrivateKey = function (privateKey) {
    store.set('private-key', privateKey);
  };

  this.getPrivateKey = function () {
    return store.get('private-key');
  };

  this.setPublicKey = function (publicKey) {
    store.set('public-key');
  };

  this.getPublicKey = function () {
    return store.get('private-key');
  };
});
