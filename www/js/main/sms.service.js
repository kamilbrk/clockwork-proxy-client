angular.module('clockworkproxy')
.service('SmsService', function ($q) {

  if (!window.cordova) {
    console.log('This has to be on Cordova');
    // return;
  }

  var SERVICE_NUMBER = '+447860033362';
  var permissions = window.cordova ? cordova.plugins.permissions : {};
  var requiredPermissions = [
    permissions.SEND_SMS
  ];

  this.send = function (message) {
    if (!message) message = 'way she goes';
    var deferred = $q.defer();

    SMS.sendSMS(SERVICE_NUMBER, message, function (response) {
      deferred.resolve(response);
    }, deferred.reject);

    return deferred.promise;
  };

  this.list = function () {
    console.log('LIST');
    var deferred = $q.defer();
    var filter = {
      box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

      // following 4 filters should NOT be used together, they are OR relationship
      // read : 0, // 0 for unread SMS, 1 for SMS already read
      // _id : 1234, // specify the msg id
      address: SERVICE_NUMBER, // sender's phone number
      // body : 'This is a test SMS', // content to match

      // following 2 filters can be used to list page up/down
      // indexFrom : 0, // start from index 0
      maxCount: 500 // count of SMS to return each time
    };

    if (!window.cordova) {
      deferred.resolve([
        { body: '0382d86009ce954cc640f89e202d16023156715dd3f53837ae002a922d18ebe2b7bc454533658ac8a460aad914170acff80f34fb2eaa6a901b722f777acb28511b7c91f6dff5' },
        { body: '18b69977913bcd492f96e4f614757f4aa575a9c61a39e5cdbb4ddff65ff10214ba241174ceef1474e4f6185a79d8dde960539d9f5b3007b663ff0e' },

        { body: '0382d86009ce954cc640f89e202d16023156715dd3f53837ae002a922d18ebe2b7bc454533658ac8a460aad914170acff80f34fb2eaa6a901b722f777acb28511b7c91f6dff5' },
        { body: '18b69977913bcd492f96e4f614757f4aa575a9c61a39e5cdbb4ddff65ff10214ba241174ceef1474e4f6185a79d8dde960539d9f5b3007b663ff0e' }
      ]);
    } else {
      SMS.listSMS(filter, deferred.resolve, deferred.reject);
    }

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
    var data = e.data;
    console.log('sms received', data);

    /*
    {
      "address": "+447858308368",
      "body": "HEY",
      "date_sent": 1509212428000,
      "date": 1509212429764,
      "read": 0,
      "seen": 0,
      "status": 0,
      "type": 1,
      "service_center": "+447782000800"
    }
    */
  }

  this.getPermission();

});
