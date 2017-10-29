angular.module('clockworkproxy')

.controller('MessageCtrl', function ($scope, $stateParams, $ionicLoading, MessagesService) {
  var $ctrl = this;

  $ionicLoading
    .show({
      template: 'Loading and decrypting message...'
    })
    .then(function () {
      return MessagesService.getMessage($stateParams.id)
    })
    .then(function (message) {
      $ctrl.message = message;
    })
    .finally(function () {
      $scope.$broadcast('scroll.refreshComplete');
      return $ionicLoading.hide();
    });
});
