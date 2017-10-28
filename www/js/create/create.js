angular.module('clockworkproxy')

.controller('CreateCtrl', function () {
  console.log('CreateCtrl here');

  this.message = {
    recipient: '',
    body: ''
  };

  this.send = function () {
    console.log('sending');
  };

});
