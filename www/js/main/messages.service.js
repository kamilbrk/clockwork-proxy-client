angular.module('clockworkproxy')
.service('MessagesService', function (SmsService, Keys) {

  this.getMessages = function () {
    var myPrivateKey = Keys.getMyPrivateKey();

    return SmsService.list().then(function (inbox) {
      var messages = [];
      var currentBufferChunks = [];
      var alreadyRan = false;

      inbox.forEach(function (sms, index) {

        // 1. Add to the buffer
        currentBufferChunks.push(sms.body);

        var firstCharacter = +sms.body[0];
        if (firstCharacter === 0 || index === inbox.length - 1) {

          // 2. We need to build from the currentBufferChunks
          if (currentBufferChunks.length && alreadyRan) {
            var sorted = currentBufferChunks.sort();
            var buffer = '';

            sorted.forEach(function (item) {
              buffer += item.slice(1);
            });

            var decryptedBuffer = myPrivateKey.decrypt(buffer);
            messages.push(decryptedBuffer);
            currentBufferChunks = [];
          }

          alreadyRan = true;
        }

      });

      console.log('messages', messages);

    });
  };

});
