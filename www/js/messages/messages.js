angular.module('clockworkproxy')

.controller('MessagesCtrl', function ($scope, $ionicLoading, MessagesService) {
  var $ctrl = this;

  $ctrl.refresh = function () {
    $ionicLoading
      .show({
        template: 'Loading and decrypting messages...'
      })
      .then(function () {
        return MessagesService.getMessages();
      })
      .then(function (messages) {
        $ctrl.messages = messages;
      })
      .finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
        return $ionicLoading.hide();
      });
  }

  $ctrl.refresh();

});
