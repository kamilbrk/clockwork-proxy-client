angular.module('clockworkproxy')
.service('SMS', function () {

  if (!window.cordova || !SmsReceiver || !sms) {
    console.log('Got to be on cordova mate');
    return;
  }

  var _hasPermission = false;
  var _supported = false;
  var _sendOptions = {
    replaceLineBreaks: false,
    android: {
      intent: ''
    }
  };

  this.checkPermission = function () {
    var success = function (hasPermission) {
      _hasPermission = hasPermission;
      console.log('SMS Permission', _hasPermission);
    };
    var error = function (e) {
      console.log('Something went wrong:' + e);
    };

    sms.hasPermission(success, error);
  };

  this.checkSupport = function () {
    SmsReceiver.isSupported(function (supported) {
      _supported = supported;
      console.log('SMS Support', _supported);
    }, function (error) {
      console.log('Error while checking the SMS support', error);
    });
  }

  this.send = function (number, message) {
    if (!_hasPermission) return;

    var success = function () {
      console.log('Message sent successfully');
    };
    var error = function (e) {
      console.log('Message not send due to error:' + e);
    };

    sms.send(number, message, _sendOptions, success, error);
  };

  this.startReception = function () {
    SmsReceiver.startReception(function (response) {
      console.log('startReception response', response); // {messageBody, originatingAddress}
    }, function (error) {
      console.log('startReception error', error);
    });
  };

  this.stopReception = function () {
    SmsReceiver.stopReception(function (response) {
      console.log('StopReception: Correctly stopped')
    }, function () {
      console.log('StopReception: Error while stopping the SMS receiver')
    });
  };

  this.checkSupport();
  this.checkPermission();
});
