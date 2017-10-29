angular.module('clockworkproxy', ['ionic', 'ngMessages', 'angular-storage'])

.controller('AppCtrl', function () {
  if (!window.cordova) {
    console.log('Running without cordova, things may not work and you\'ll see some test data.');
  }
});

angular.element(document).ready(function() {
	if (window.cordova) {
		document.addEventListener('deviceready', function() {
			angular.bootstrap(document.body, ['clockworkproxy']);
		}, false);
	} else {
		angular.bootstrap(document.body, ['clockworkproxy']);
	}
});
