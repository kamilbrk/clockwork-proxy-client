angular.module('clockworkproxy')

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'js/app.html',
    controller: 'AppCtrl'
  })

  .state('app.messages', {
    url: '/messages',
    views: {
      'main': {
        templateUrl: 'js/messages/messages.html',
        controller: 'MessagesCtrl as $ctrl'
      }
    },
    resolve: {
      messages: function () {
        return [];
      }
    }
  })
  .state('app.messages.detail', {
    url: '/:id',
    views: {
      'main': {
        templateUrl: 'js/messages/detail/detail.html',
        controller: 'DetailCtrl as $ctrl'
      }
    },
    resolve: {
      message: function (messages, $stateParams) {
        return messages.find(function (x) { return x.id === $stateParams.id; });
      }
    }
  })
  .state('app.create', {
    url: '/create',
    views: {
      'main': {
        templateUrl: 'js/messages/create/create.html',
        controller: 'CreateCtrl as $ctrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/messages');
});
