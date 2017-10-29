angular.module('clockworkproxy')
.service('SmsService', function ($q, $timeout, Keys) {
  var SERVICE_NUMBER = '+447860033362';
  var permissions = window.cordova ? cordova.plugins.permissions : {};
  var requiredPermissions = [
    permissions.SEND_SMS
  ];

  this.send = function (message) {
    if (!message) message = 'way she goes';
    var deferred = $q.defer();

    if (!window.cordova) {
      return $timeout(function () {
        return $q.when('OK');
      }, 3000);
    }

    SMS.sendSMS(SERVICE_NUMBER, message, function (response) {
      deferred.resolve(response);
    }, deferred.reject);

    return deferred.promise;
  };

  this.getTexts = function (folder) {

    if (!window.cordova) {
      // Four sample messages for running with `ionic serve` in a browser environment, where cordova and SMS plugins are not available

      // Random 4 characters. Range is different as it may contain 0-9, but we don't care that much here anyway.
      var ids = Math.random().toString(36).substr(2, 4);
      var sampleMessages = [ // Bacon Ipsum!
        'Bacon ipsum dolor amet bacon tenderloin shankle, corned beef spare ribs meatloaf burgdoggen doner.',
        'Ribeye turducken pastrami, capicola pancetta fatback kielbasa beef bresaola landjaeger corned beef.',
        'Chicken meatloaf leberkas beef flank burgdoggen. Leberkas drumstick kielbasa pork loin, shankle salami.',
        'Venison beef andouille flank fatback tri-tip jowl corned beef pork beef ribs t-bone tongue capicola.'
      ];

      var encryptedSampleMessages = [];
      var myPublicKey = Keys.getMyPublicKey();

      sampleMessages.forEach(function (sampleMessage, messageId) {
        // 1. Encrypt the message
        var encrypt = myPublicKey.encrypt(sampleMessage);

        // 2. Split into 138 chars (we need two for message ID and order)
        var split = encrypt.match(/.{1,138}/g);

        // 3. Process each part
        split.forEach(function (encrypted, order) {
          // console.log('splt map', ids[messageId], order, encrypted);

          // 4. Prefix each part with message ID and order
          var withIdOrder = ids[messageId] + order + encrypted;
          // console.log('prefixed', withIdOrder);

          // 5. Output the finished part with the content just like the one in incoming text messages
          encryptedSampleMessages.push({ body: withIdOrder });
        });
      });

      return $q.resolve(encryptedSampleMessages);
    }

    var deferred = $q.defer();
    folder = folder || 'inbox';

    var filter = {
      box: folder, // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

      // following 4 filters should NOT be used together, they are OR relationship
      // read: 0, // 0 for unread SMS, 1 for SMS already read
      // _id: 1234, // specify the msg id
      address: SERVICE_NUMBER, // sender's phone number
      // body: 'This is a test SMS', // content to match

      // following 2 filters can be used to list page up/down
      // indexFrom: 0, // start from index 0
      maxCount: 500 // count of SMS to return each time
    };

    SMS.listSMS(filter, deferred.resolve, deferred.reject);

    return deferred.promise;
  };

  this.startReception = function () {
    var deferred = $q.defer();

    SMS.startWatch(function () {
      document.addEventListener('onSMSArrive', _onSmsArrive);
      deferred.resolve();
    }, deferred.reject);

    return deferred.promise;
  };

  this.stopReception = function () {
    var deferred = $q.defer();
    document.removeEventListener('onSMSArrive', _onSmsArrive);
    SMS.stopWatch(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  this.checkPermission = function () {
    var deferred = $q.defer();

    permissions.checkPermission(requiredPermissions, function (gotIt) {
      if (gotIt) {
        deferred.resolve();
      } else {
        deferred.reject('permission');
      }
    }, deferred.reject);

    return deferred.promise;
  }

  this.getPermission = function () {
    var deferred = $q.defer();
    if (!window.cordova) return $q.when();

    permissions.requestPermission(requiredPermissions, function (accepted) {
      if (accepted) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }, deferred.reject);

    return deferred.promise;
  };

  function _onSmsArrive (e) {
    var deferred = $q.defer();
    /*{
      "address": "+447858308368",
      "body": "HEY",
      "date_sent": 1509212428000,
      "date": 1509212429764,
      "read": 0,
      "seen": 0,
      "status": 0,
      "type": 1,
      "service_center": "+447782000800"
    }*/
    var data = {
      from: e.data.address,
      body: e.data.body,
      date: e.data.date,
      dateSent: e.data.date_sent
    };
    console.log('SMS received', data);
    deferred.resolve(data);
    return deferred.promise;
  }

  this.getPermission();

});
