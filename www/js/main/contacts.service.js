angular.module('clockworkproxy')
.service('ContactsService', function ($q) {

  var Service = {};

  Service.pickContact = function () {
    if (!window.cordova) {
      return $q.when({
        id: '012345',
        displayName: 'Kamil',
        phoneNumbers: [{
          id: '213',
          value: '+447858308368',
          pref: false
        }],
        photos: [{
          id: '882',
          pref: false,
          type: 'url',
          value: 'content://com.android.contacts/contacts/99/photo'
        }],
      });
    }

    var deferred = $q.defer();
    console.log('Picking a contact');
    navigator.contacts.pickContact(deferred.resolve, deferred.reject);
    return deferred.promise;
  };

  return Service;
});


/*
{
  "id": "99",
  "rawId": "78",
  "displayName": "Oli Newsham",
  "name": {
    "familyName": "Newsham",
    "givenName": "Oli",
    "formatted": "Oli Newsham"
  },
  "nickname": null,
  "phoneNumbers": [
    {
      "id": "895",
      "pref": false,
      "value": "+447879995042",
      "type": "work"
    }
  ],
  "emails": [
    {
      "id": "888",
      "pref": false,
      "value": "oli.newsham@collabco.co.uk",
      "type": "work"
    },
    {
      "id": "890",
      "pref": false,
      "value": "oli.newsham@outlook.com",
      "type": "home"
    },
    {
      "id": "1021",
      "pref": false,
      "value": "oli.newsham@gmail.com",
      "type": "other"
    }
  ],
  "addresses": [
    {
      "id": "892",
      "pref": false,
      "type": "home",
      "formatted": "Flat 62, Stonebridge House\n5 Cobourg Street\nManchester M1 3GB",
      "streetAddress": "Flat 62, Stonebridge House\n5 Cobourg Street",
      "locality": "Manchester",
      "postalCode": "M1 3GB"
    }
  ],
  "ims": null,
  "organizations": [
    {
      "id": "893",
      "pref": false,
      "type": "other",
      "name": "Collabco",
      "title": "Senior Developer"
    }
  ],
  "birthday": "1986-10-16T23:00:00.000Z",
  "note": "",
  "photos": [
    {
      "id": "882",
      "pref": false,
      "type": "url",
      "value": "content://com.android.contacts/contacts/99/photo"
    }
  ],
  "categories": null,
  "urls": null
}
*/
