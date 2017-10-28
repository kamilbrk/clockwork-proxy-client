angular.module('clockworkproxy')

.controller('MessagesCtrl', function (MessagesService) {
  console.log('MessagesCtrl here');

  MessagesService.getMessages().then(function (messages) {
    // this.messages = messages;
  });

  this.messages = [{
    id: 123,
    author: 'Kamil',
    body: 'Some body'
  }];
});
