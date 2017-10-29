angular.module('clockworkproxy')
.service('SmsService', function ($q) {

  if (!window.cordova) {
    console.log('This has to be on Cordova');
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

  this.getTexts = function (folder) {
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

    if (!window.cordova) {
      // Four sample messages for running with `ionic serve` in a browser environment, where cordova and SMS plugins are not available
      deferred.resolve([
        { from: '', to: '', body: "b108727387d784abee3e986b43ae6af97ae83621cf94a102ed6267599edefcbefdfb461ea448cabbcc2bdc49fbd98d7af4309a21a4b10bc503e5a71f" },
        { from: '', to: '', body: "a0441638beaf3b5abc4665717708ffb3c4956f2c36eba771b7fa58ef8ee6982dcba7e2ede2035890830e3847c1c6b7ef463693955c13e34cd0d26af0ee53df4132ccc0664252" },
        { from: '', to: '', body: "a108727387d784abee3e986b43ae6af97ae83621cf94a102ed6267599edefcbefdfb461ea448cabbcc2bdc49fbd98d7af4309a21a4b10bc503e5a71f" },
        { from: '', to: '', body: "x015631ee2eb436fd8ccea3cbcf887d0c27ef83d2deafdf8a880f366b381a9edaea5919772929a04024117b0c546d9ab856675d5dace80c82abb8a787761224ab970347bf35a" },
        { from: '', to: '', body: "b0441638beaf3b5abc4665717708ffb3c4956f2c36eba771b7fa58ef8ee6982dcba7e2ede2035890830e3847c1c6b7ef463693955c13e34cd0d26af0ee53df4132ccc0664252" },
        { from: '', to: '', body: "l0441638beaf3b5abc4665717708ffb3c4956f2c36eba771b7fa58ef8ee6982dcba7e2ede2035890830e3847c1c6b7ef463693955c13e34cd0d26af0ee53df4132ccc0664252" },
        { from: '', to: '', body: "l108727387d784abee3e986b43ae6af97ae83621cf94a102ed6267599edefcbefdfb461ea448cabbcc2bdc49fbd98d7af4309a21a4b10bc503e5a71f" },
        { from: '', to: '', body: "x1fc35521ba8a03d9e1f80049d89cb5ad4b36bcd37966ba2d01adf07398df8cc612010c4375268498b1bcef1e10031ab7b77145e8bef1d0d0fd86c8e" }
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
