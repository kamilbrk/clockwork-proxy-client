angular.module('clockworkproxy')
.service('MessagesService', function (SmsService, Keys) {

  this.getMessages = function () {
    var myPrivateKey = Keys.getMyPrivateKey();

    return SmsService.getTexts('')
      .then(function (rawInbox) {
        var result = [];

        // 1. Raw contents of the inbox (filtered by sender phone number in SmsService)
        // console.log('Inbox (raw):', inbox);

        // 2. Group all messages by the message ID (first character in each text message)
        var messageGroups = rawInbox.reduce(function (acc, item) {
          var messageId = item.body[0]; // first character
          acc[messageId] = acc[messageId] || [];
          acc[messageId].push(item.body.slice(1));
          return acc;
        }, {});
        // console.log('Inbox (grouped by Message ID):', messageGroups);

        for (var messageId in messageGroups) {
          if (messageGroups.hasOwnProperty(messageId)) {

            // 3. Get all parts of that message and sort it by the order character (2nd in the original text)
            var messageParts = messageGroups[messageId].sort();
            // console.log('Message ID ' + messageId + ' has ' + messageParts.length + ' parts (already sorted):', messageParts);

            // 4. Concatenate all message parts into one
            var buffer = '';

            for (var partIndex = 0; partIndex < messageParts.length; partIndex++) {
              buffer += messageParts[partIndex].slice(1);
            }
            // console.log('Buffer for that message with ID ' + messageId + ':', buffer);

            // 5. Decrypt the message using user's private key
            var decryptedBuffer = myPrivateKey.decrypt(buffer);
            // console.log('Decrypted message with ID ' + messageId + ':', decryptedBuffer);

            // 6. Push the decrypted message to the list of results
            result.push({ id: messageId, from: '', to: '', body: decryptedBuffer });
          }
        }

        return result;
      });
  };

});
