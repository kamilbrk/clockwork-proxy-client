angular.module('clockworkproxy')
.service('Keys', function (store, Crypto) {

  this.setServerPublicKey = function(publicKey) {
    store.set('server-public-key', Crypto.getPublicKeyPEM(publicKey));
  };

  this.getServerPublicKey = function() {
    var key = store.get('server-public-key');
    
    if (!key) {
      return null;
    }

    return Crypto.getKeyFromPEM(key);
  };

  this.setMyPrivateKey = function (privateKey) {
    store.set('my-private-key', Crypto.getPrivateKeyPEM(privateKey));
  };

  this.getMyPrivateKey = function () {
    var key = store.get('my-private-key');
    
    if (!key) {
      return null;
    }

    return Crypto.getKeyFromPEM(key);
  };

  this.setMyPublicKey = function (publicKey) {
    store.set('my-public-key', Crypto.getPublicKeyPEM(publicKey));
  };

  this.getMyPublicKey = function () {
    var key = store.get('my-public-key');
    
    if (!key) {
      return null;
    }

    return Crypto.getKeyFromPEM(key);
  };

  this.isRegistered = function() {
    return this.getServerPublicKey() && this.getMyPrivateKey() && this.getMyPublicKey();
  }
});
