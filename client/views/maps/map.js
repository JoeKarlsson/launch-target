//Global variable for setting default zoom in google maps
var MAP_ZOOM = 17;
var results;

//When app starts load google maps
Meteor.startup(function() {
  GoogleMaps.load({ v : '3', key : 'AIzaSyAG_bYopvQf3H2lrQBNfKJyo4fic2ETdFI', libraries : 'geometry,places' });
});

//Pull latitude and longitude from google maps api and return location zoom
Template.map.helpers({
  //If there is an error finding the current users geoloaction - spit out error to the DOM
  geolocationError : function() {
    var error = Geolocation.error();
    return error && error.message;
  },

  //Set out map options
  mapOptions : function() {
    var latLng = Geolocation.latLng();

    //Initialize the map once we  have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center : new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom : MAP_ZOOM
      };
    }
  },
  allTargets : function () {
    console.log(Session.get('allTargets'));
    return Session.get('allTargets');
  }
});

//Create google maps marker for current location
Template.map.onCreated(function() {
  var self = this;

  GoogleMaps.ready('map', function(map) {
    //get lat and long from current location
    var latLng = Geolocation.latLng();

    //variable within scope that sets current location
    var currentPost = new google.maps.LatLng(latLng.lat, latLng.lng);

    //variable that creates a new instance of marker information display
    var infowindow = new google.maps.InfoWindow();

    //drop marker on current location
    var marker = new google.maps.Marker({
      position : currentPost,
      map : map.instance
    });

    //get surrounding restaurants within radius
    //call on the document of food which is an array of objects
    var service = new google.maps.places.PlacesService(map.instance);
    service.nearbySearch({
      location : currentPost,
      radius : 500,
      types : ['food']
    }, callback);

    //Error checking to check for status of query
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log('targets', targets);

        var targets = results.map(function (target) {
          console.log('target', target);
          createMarker(target);
          var targetDetail = {
            name : target.name,
            placeId : target.place_id,
            include : false,
            location : target.geometry.location,
            icon : target.icon,
            vicinity : target.vicinity,
            rating : target.rating,
            votes : 0
          };
          return targetDetail;
        });
        Session.set('allTargets', targets);
      }
    }

    //create marker for all restaurant locations within radius
    function createMarker(place) {
      console.log('place', place);
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map : map.instance,
        position : place.geometry.location,
        draggable : false
      });

      //event listener that loads resturant information into infowindow.
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map.instance, this);
      });
      return marker;
    }
  });
});
