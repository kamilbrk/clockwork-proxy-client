angular.module('clockworkproxy', ['ionic', 'angular-storage'])

.controller('AppCtrl', function () {
  console.log('AppCtrl here');
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
