angular.module('clockworkproxy')

.controller('MessagesCtrl', function (MessagesService) {

  MessagesService.getMessages().then(function (messages) {
    window.msgs = messages;
  });

  this.messages = [{
    id: 123,
    author: 'Kamil',
    body: 'Some body'
  }];
});
