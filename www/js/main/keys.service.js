angular.module('clockworkproxy')
.service('Keys', function (store) {

  this.setServerPublicKey = function(publicKey) {
    store.set('server-public-key', publicKey);
  };

  this.getServerPublicKey = function() {
    return store.get('server-public-key');
  };

  this.setMyPrivateKey = function (privateKey) {
    store.set('my-private-key', privateKey);
  };

  this.getMyPrivateKey = function () {
    return store.get('my-private-key');
  };

  this.setMyPublicKey = function (publicKey) {
    store.set('my-public-key');
  };

  this.getMyPublicKey = function () {
    return store.get('my-private-key');
  };

  this.isRegistered = function() {
    return this.getServerPublicKey() && this.getMyPrivateKey() && this.getMyPublicKey();
  }
});
