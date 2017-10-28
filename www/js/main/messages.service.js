angular.module('clockworkproxy')
.service('MessagesService', function (SmsService, Keys) {

  this.getMessages = function () {
    var myPrivateKey = Keys.getMyPrivateKey();

    return SmsService.list().then(function (inbox) {
      var result = [];
      var currentBufferChunks = [];
      var alreadyRan = false;

      // console.log('Inbox (raw):', inbox);

      var messageGroups = inbox.reduce(function (acc, item) {
        var messageId = item.body[0]; // first character
        acc[messageId] = acc[messageId] || [];
        acc[messageId].push(item.body.slice(1));
        return acc;
      }, {});

      // console.log('Inbox (grouped by Message ID):', messageGroups);

      for (var messageId in messageGroups) {
        if (messageGroups.hasOwnProperty(messageId)) {
          var messageParts = messageGroups[messageId].sort();
          // console.log('Message ID ' + messageId + ' has ' + messageParts.length + ' parts (already sorted):', messageParts);

          var buffer = '';

          for (var partIndex = 0; partIndex < messageParts.length; partIndex++) {
            buffer += messageParts[partIndex].slice(1);
          }

          // console.log('Buffer for that message with ID ' + messageId + ':', buffer);
          var decryptedBuffer = myPrivateKey.decrypt(buffer);

          console.log('Decrypted message with ID ' + messageId + ':', decryptedBuffer);

          result.push(decryptedBuffer);
        }
      }


      // for (var index = 0; index < inbox.length; index++) {
      //   var sms = inbox[index];

      //   var messageId = sms.slice(0, 1);



      //   // 1. Add to the buffer
      //   currentBufferChunks.push(sms.body);

      //   var firstCharacter = +sms.body[0];
      //   if (firstCharacter === 0 || index === inbox.length - 1) {

      //     // 2. We need to build from the currentBufferChunks
      //     if (currentBufferChunks.length && alreadyRan) {
      //       var sorted = currentBufferChunks.sort();
      //       var buffer = '';

      //       sorted.forEach(function (item) {
      //         buffer += item.slice(1);
      //       });

      //       var decryptedBuffer = myPrivateKey.decrypt(buffer);
      //       messages.push(decryptedBuffer);
      //       currentBufferChunks = [];
      //     }

      //     alreadyRan = true;
      //   }
      // }

      return result;
    });
  };

});
