angular.module('clockworkproxy')

.controller('DetailCtrl', function ($stateParams) {
  console.log('DetailsCtrl here, $stateParams.id=', $stateParams.id);
  this.message = {
    id: 123,
    author: 'Kamil',
    body: 'Some body'
  };
});
