angular.module('clockworkproxy')

.controller('CreateCtrl', function (ClockworkProxy) {
  console.log('CreateCtrl here');

  this.message = {
    recipient: '447858308368',
    body: 'Some message body ' + (+new Date())
  };

  this.send = function () {
    console.log('sending', this.message);
    ClockworkProxy.sendMessage(this.message.recipient, this.message.body)
      .then(function (res) {
        console.log('res', res);
      });
  };

});
