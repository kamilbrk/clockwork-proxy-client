angular.module('clockworkproxy')

.controller('DetailCtrl', function (message) {
  var $ctrl = this;
  $ctrl.message = message;

  console.log('msg', message);
});
