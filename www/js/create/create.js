angular.module('clockworkproxy')

.controller('CreateCtrl', function (ClockworkProxy, ContactsService, PreferencesService, $scope, $timeout, $ionicPopover, $ionicHistory) {
  var $ctrl = this;

  var template = '<ion-popover-view><ion-content>Message sent!</ion-content></ion-popover-view>';
  var popover = $ionicPopover.fromTemplate(template);

  $ctrl.useContacts = PreferencesService.get('useContacts');

  $ctrl.message = {
    to: '',
    body: ''
  };

  $ctrl.pick = function () {
    return ContactsService.pickContact()
      .then(function (contact) {
        var numbers = contact.phoneNumbers;
        if (numbers.length) {
          var number = contact.phoneNumbers[0].value;
          if (number[0] === '+') number = +number.slice(1);
          $ctrl.message.to = number;
        }
      }, function (error) {
        console.log('Could not pick a contact', error);
      });
  };

  $ctrl.send = function () {
    if (!$ctrl.form.$valid) return;

    $ctrl.sending = true;
    console.log('Going to send', $ctrl.message);

    ClockworkProxy.sendMessage($ctrl.message.to, $ctrl.message.body)
      .then(function (response) {
        console.log('Send message promises (one per part, at least two)', response);
        popover.show();

        $timeout(function () {
          popover.hide();
          $ionicHistory.goBack();
        }, 3000);
      })
      .finally(function () {
        $ctrl.sending = false;
      });
  };

  $scope.$on('$destroy', function () {
    popover.remove();
  });

});
