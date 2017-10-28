angular.module('clockworkproxy')
.service('MessagesService', function (SmsService) {

  this.getMessages = function () {
    console.log('this is supposed to grab and build up messages from chunks');
    return SmsService.list();
  };

});
