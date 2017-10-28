angular.module('clockworkproxy')

.run(function () {

  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
  // for form inputs)
  if (window.cordova && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    cordova.plugins.Keyboard.disableScroll(true);
  }

  // Ignore device font size setting
  if (window.MobileAccessibility) {
    window.MobileAccessibility.usePreferredTextZoom(false);
  }

  if (window.StatusBar) {
    // org.apache.cordova.statusbar required
    StatusBar.styleDefault();
  }
})
