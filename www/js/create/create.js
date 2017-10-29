angular.module('clockworkproxy')

.controller('CreateCtrl', function (ClockworkProxy) {
  console.log('CreateCtrl here');

  this.message = {
    to: '447858308368',
    body: 'Some message body ' + (+new Date())
  };

  this.send = function () {
    console.log('Going to send', this.message);

    ClockworkProxy.sendMessage(this.message.to, this.message.body)
      .then(function (response) {
        console.log('Send message promises (one per part, at least two)', response);
      });
  };

});
