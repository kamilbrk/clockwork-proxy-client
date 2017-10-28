angular.module('clockworkproxy')

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    resolve: {
      Register: function(Crypto, Keys, ClockworkProxy) {
        // Check if the app has registered
        if (!Keys.isRegistered()) {
          // 1. Set the public key of our server
          var serverPublicKey = Crypto.getKeyFromPEM((
            '-----BEGIN PUBLIC KEY-----' + 
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCau3e35dOtNGX9b772JIiSoxGt' + 
            '0VsBsI96V8FEgPCLT56mGR5Gfwf3qiZebU+pmK2OlQh857qZtWd6Gr9zW59NDZwH' + 
            'bjLl7K3+5s0BgV+grQ4LbrC4/1gE8fjj7i1NBIuIgrn4TcxuohNsRCzP/yp5CNg0' + 
            'iX4KjfDYKyYK2g0fEQIDAQAB' + 
            '-----END PUBLIC KEY-----'
            ));

          Keys.setServerPublicKey(serverPublicKey);
          
          // 2. Generate a key pair for this device
          var myKeyPair = Crypto.generateKeyPair();

          // 3. Store the key pair locally
          Keys.setMyPublicKey(myKeyPair.pubKeyObj);
          Keys.setMyPrivateKey(myKeyPair.prvKeyObj);

          // 4. Send the Registration message
          return ClockworkProxy.register(myKeyPair.pubKeyObj);
        }
      }
    }
  })


  .state('app.send', {
    url: '/send',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlists.html',
        // controller: 'PlaylistsCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/app/send');
});
