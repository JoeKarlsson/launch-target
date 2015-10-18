var finalTargets;

Template.finalLaunchPlan.helpers({
  allFinalTargets : function () {
    // console.log(Session.get('allTargets'));
    return this.finalLaunches;
  },
  setFinalTargets : function () {
    finalTargets = this.finalLaunches;

    console.log(finalTargets);
    return Session.set('allTargets', finalTargets);
  }
});

//////////////////////////////

/////Global variable for setting default zoom in google maps
var MAP_ZOOM = 17;
var results;

// //When app starts load google maps
// Meteor.startup(function() {
//   GoogleMaps.load({ v : '3', key : 'AIzaSyAG_bYopvQf3H2lrQBNfKJyo4fic2ETdFI', libraries : 'geometry,places' });
// });

//Pull latitude and longitude from google maps api and return location zoom
Template.finalLaunchPlan.helpers({
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
Template.finalLaunchPlan.onCreated(function() {
  var self = this;

  GoogleMaps.ready('map', function(map) {
    //get lat and long from current location
    var latLng = Geolocation.latLng();
    console.log('latlng', latLng);

    //variable within scope that sets current location
    var currentPost = new google.maps.LatLng(latLng.lat, latLng.lng);

    //variable that creates a new instance of marker information display
    var infowindow = new google.maps.InfoWindow();

    //drop marker on current location
    var marker = new google.maps.Marker({
      position : currentPost,
      map : map.instance,
      animation: google.maps.Animation.DROP,
    });

    console.log('finalTargets', finalTargets);
    setMarkers(finalTargets);

    function setMarkers(places) {
      for (var i = 0; i < places.length; i++) {
        console.log('places', places[i]);
        createMarker(places[i]);
      }
    }

    //create marker for all restaurant locations within radius
    function createMarker(place) {

      var placeLoc = {
        lat: place.location.G,
        lng : place.location.K
      };

      console.log('placeLoc', placeLoc);
      var marker = new google.maps.Marker({
        map : map.instance,
        position : placeLoc,
        draggable : false,
        animation: google.maps.Animation.DROP
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
