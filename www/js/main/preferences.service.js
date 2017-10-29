angular.module('clockworkproxy')
.service('PreferencesService', function ($q, $window, $ionicHistory, $ionicActionSheet, store) {
  var Service = {};

  var _preferences = store.get('preferences') || {};

  if (typeof _preferences.useContacts === 'undefined') _preferences.useContacts = false;
  if (typeof _preferences.useContacts === 'undefined') _preferences.useContacts = false;

  Service.get = function (property) {
    return property ? _preferences[property] : _preferences;
  };

  Service.save = function (preferences) {
    if (!preferences) return;

    for (var key in preferences) {
      if (preferences.hasOwnProperty(key)) {
        _preferences[key] = preferences[key];
      }
    }

    store.set('preferences', _preferences);
  };

  Service.deregister = function () {
    return $ionicActionSheet.show({
      destructiveText: 'Reset everything',
      titleText: 'Do you want to remove all keys and reset the app?',
      cancelText: 'Cancel',
      buttonClicked: function (index) {
        console.log('index', index);
      },
      destructiveButtonClicked: function () {
        $window.localStorage.clear();
        $ionicHistory.goBack();
        $window.location.reload();
      }
    });
  };

  return Service;
});
