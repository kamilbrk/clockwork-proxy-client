angular.module('clockworkproxy')
.service('SmsService', function ($q) {
  if (!window.cordova) {
    console.log('This has to be on Cordova');
    return;
  }

  var SERVICE_NUMBER = '+447860033362';
  var permissions = cordova.plugins.permissions;

  this.send = function (message) {
    if (!message) message = 'way she goes';

    return this.checkPermission()
      .then(function () {
        var deferred = $q.defer();

        SMS.sendSMS(SERVICE_NUMBER, message, function (response) {
          deferred.resolve(response);
        }, deferred.reject);

        return deferred.promise;
      });
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

    permissions.checkPermission(permissions.SEND_SMS, function (gotIt) {
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

    permissions.getPermission(permissions.SEND_SMS, function (accepted) {
      if (accepted) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }, deferred.reject);
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
