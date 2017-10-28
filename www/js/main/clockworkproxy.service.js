angular.module('clockworkproxy')
.service('ClockworkProxy', function (Keys, Crypto, SmsService, $q) {

  this.register = function(myKey) {
    // 1. Get the key PEM
    var myKeyPem = Crypto.getPublicKeyPEM(myKey);

    // 2. Split the content into n-size chunks
    var parts = myKeyPem.replace(/(\r\n|\n|\r)/gm, '').match(/.{1,138}/g);

    // 3. For each chunk, send a message
    var messages = [];

    for(var i = 0; i < parts.length; i++) {
      var message = i + 'R' + parts[i];
      messages.push(SmsService.send(message));
    }

    return $q.all(messages);
  };

  this.sendMessage = function(recipient, message) {
    // 1. Get the server public key
    var serverKey = Keys.getServerPublicKey();

    // 2. Encrypt the message, with the recipient separated by a tilde
    var encryptedMsg = serverKey.encrypt(recipient + '~' + message);

    // 2. Split the content into n-size chunks
    var parts = encryptedMsg.match(/.{1,138}/g);

    // 3. For each chunk, send a message
    var messages = [];

    for(var i = 0; i < parts.length; i++) {
      var message = i + 'M' + parts[i];
      messages.push(SmsService.send(message));
    }

    return $q.all(messages);
  };

});
