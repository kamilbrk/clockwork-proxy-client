angular.module('clockworkproxy')

.controller('PreferencesCtrl', function ($scope, $ionicLoading, PreferencesService) {
  var $ctrl = this;

  $ctrl.preferences = PreferencesService.get();

  $ctrl.save = function () {
    console.log('saving', $ctrl.preferences);
    PreferencesService.save($ctrl.preferences);
  };

  $ctrl.reset = function () {
    PreferencesService.deregister();
  }

});
